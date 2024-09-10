import { getCurrentUser } from "../services/apiAuth";

export async function checkIsAdmin() {
  const user = await getCurrentUser();
  return user.user_metadata.role === "admin";
}
