import PropTypes from "prop-types";

import Heading from "./Heading";
import Button from "./Button";

import { useAdmin } from "../features/users/useAdmin";
import { useMoveBack } from "../hooks/useMoveBack";
import styled from "styled-components";

AdminOnly.propTypes = {
  children: PropTypes.any,
};

const Box = styled.div`
  display: flex;
  height: 50vh;
  gap: 4rem;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

function AdminOnly({ children }) {
  const moveBack = useMoveBack();
  const { isAdmin } = useAdmin();

  if (isAdmin) return children;
  else
    return (
      <Box>
        <Heading as="h2">
          You don&apos;t have permission to see this site.
        </Heading>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </Box>
    );
}

export default AdminOnly;
