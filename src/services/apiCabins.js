import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(
  newCabin,
  id,
  isEditSession = false,
  imageToDelete
) {
  const oldImagePath = imageToDelete?.split("/").at(8);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const uploadNewImage = Boolean(hasImagePath);

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
  if (!uploadNewImage) {
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

    //B) Delete old image from bucket if image is in edit mode and new image was uploaded
    if (isEditSession) {
      await supabase.storage.from("cabin-images").remove(oldImagePath);
    }

    return data;
  }
}

export async function deleteCabin(id, image) {
  const deleteImage = image.split("/").at(8);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  await supabase.storage.from("cabin-images").remove(deleteImage);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
