import { checkIsAdmin } from "../utils/isAdmin";
import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export async function createUserByAdmin({
  fullName,
  email,
  password,
  role,
  phone,
}) {
  const isAdmin = await checkIsAdmin();

  if (isAdmin) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      phone,
      password,
      user_metadata: { fullName, role, avatar: "", email },
      email_confirm: true,
      phone_confirm: true,
    });

    if (error) throw new Error(error.message);

    return data;
  } else return null;
}

export async function getAllUsers() {
  const isAdmin = await checkIsAdmin();

  if (isAdmin) {
    const {
      data: { users },
      error,
    } = await supabase.auth.admin.listUsers();

    if (error) throw new Error(error.message);
    return users;
  } else {
    return null;
  }
}

export async function updateUserByAdmin({
  userId,
  userData: { phone, fullName, role, password },
}) {
  const isAdmin = await checkIsAdmin();

  const currentUser = await getCurrentUser();
  console.log(currentUser);

  if (isAdmin) {
    let updateData = {
      phone,
      user_metadata: { fullName, role },
    };

    if (password !== "") {
      updateData = { password, ...updateData };
    }

    const { data: user, error } = await supabase.auth.admin.updateUserById(
      userId,
      updateData
    );

    if (error) throw new Error("User could not be updated");

    return user;
  } else {
    return null;
  }
}

export async function deleteUserByAdmin({ userId }) {
  const isAdmin = await checkIsAdmin();
  const { id } = await getCurrentUser();

  if (userId === id) throw new Error("You can't delete yourself!");

  if (isAdmin) {
    //Get avatar path to delete from supabase
    const {
      data: {
        user: {
          user_metadata: { avatar },
        },
      },
    } = await supabase.auth.admin.getUserById(userId);
    const oldAvatar = avatar.split("/").at(8);

    //Delete user
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) throw new Error("User was not deleted");

    //Delete old avatar from supabase
    const { error: deleteAvatar } = await supabase.storage
      .from("avatars")
      .remove(oldAvatar);

    if (deleteAvatar) throw new Error(deleteAvatar.message);

    return error;
  } else return null;
}
