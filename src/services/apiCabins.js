import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createUpdateCabin(
  newCabin,
  id,
  isEditSession = false,
  imageToDelete
) {
  //Gets image name to delete
  const oldImagePath = imageToDelete?.split("/").at(8);
  //Checks if there is more than one cabin using this image
  const isMoreThanOneCabinUsingThisImage = await getByImage(imageToDelete);
  //Cheks if user adds new image
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //Creates random image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.Create/edit cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not been created");
  }

  //2. Upload/Delete image
  if (!hasImagePath) {
    //A) Upload new image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    //3. Delete the cabin IF there was an error uploading image and is not in edit mode

    if (storageError && !isEditSession) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }

    //B) Delete old image from bucket if image is in edit mode and new image was uploaded and only one cabin is using this image
    if (isEditSession && isMoreThanOneCabinUsingThisImage === 1) {
      await supabase.storage.from("cabin-images").remove(oldImagePath);
    }

    return data;
  }
}

export async function deleteCabin(id, image) {
  //Get image name
  const imageName = image?.split("/").at(8);
  //Checks if there is more than one cabin using this image
  const isMoreThanOneCabinUsingThisImage = await getByImage(image);

  //Deletes cabin from supabase
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  //Delete image of deleted cabin from supabase bucket if only one cabin was using this image
  if (isMoreThanOneCabinUsingThisImage === 1)
    await supabase.storage.from("cabin-images").remove(imageName);

  return data;
}

export async function getByImage(image) {
  const { data, error } = await supabase
    .from("cabins")
    .select("image")
    .eq("image", image);

  if (error) {
    console.error(error);
    throw new Error("Get image error");
  }

  return data.length;
}
