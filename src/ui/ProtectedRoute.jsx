import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Spinner from "./Spinner";
import useUser from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //2.If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);

  //3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
