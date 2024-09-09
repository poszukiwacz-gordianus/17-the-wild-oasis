import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

ConfirmDelete.propTypes = {
  action: PropTypes.string,
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

function ConfirmDelete({
  action = "Delete",
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        {action} {resourceName}
      </Heading>
      <p>
        Are you sure you want to {action.toLowerCase()} this {resourceName}?
        {action === "Delete" &&
          ` permanently? This
        action cannot be undone.`}
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          {action}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
