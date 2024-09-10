import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export async function createUserByAdmin({
  fullName,
  email,
  password,
  role,
  phone,
}) {
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
}

export async function getAllUsers() {
  const user = await getCurrentUser();
  const isAdmin = user.user_metadata.role === "admin";

  if (isAdmin) {
    // Access auth admin api
    const adminAuthClient = supabase.auth.admin;

    const {
      data: { users },
      error,
    } = await adminAuthClient.listUsers();

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
}

export async function deleteUserByAdmin({ userId }) {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw new Error("User was not deleted");

  return error;
}
