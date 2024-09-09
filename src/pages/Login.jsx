import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //2.If there is authenticated user, redirect to the /dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/dashboard");
  }, [isAuthenticated, navigate, isLoading]);

  //3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated)
    return (
      <LoginLayout>
        <Logo />
        <Heading as="h4">Log in to your account</Heading>
        <LoginForm />
      </LoginLayout>
    );
}

export default Login;
