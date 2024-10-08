import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, role, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        fullName,
        avatar: "",
        role,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  console.log(updateData);
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //Get old avatar to delete from supabase
  const currentUser = await getCurrentUser();
  const oldAvatar = currentUser.user_metadata.avatar.split("/").at(8);

  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  //4. Delete old avatar from supabase
  const { error: deleteOldAvatarError } = await supabase.storage
    .from("avatars")
    .remove(oldAvatar);

  if (deleteOldAvatarError) throw new Error(deleteOldAvatarError.message);

  return updatedUser;
}
