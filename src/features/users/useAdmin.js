import useUser from "../authentication/useUser";

export function useAdmin() {
  const {
    user: { user_metadata: user },
  } = useUser();
  const isAdmin = user.role === "admin";

  return { isAdmin };
}
