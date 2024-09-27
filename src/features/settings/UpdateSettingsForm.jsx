import styled from "styled-components";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { useDeleteLogs } from "../messages/useDeleteLogs";

const StyledDiv = styled.div`
  display: flex;
  gap: 5rem;
  background-color: var(--color-grey-0);
  padding: 2.4rem 4rem;
  font-size: 2rem;
  font-weight: 600;
`;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { deleteLogs, isDeleting } = useDeleteLogs();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isUpdating}
            onWheel={(e) => e.target.blur()}
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isUpdating}
            onWheel={(e) => e.target.blur()}
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            disabled={isUpdating}
            onWheel={(e) => e.target.blur()}
            onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          />
        </FormRow>

        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            onWheel={(e) => e.target.blur()}
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>

      <StyledDiv>
        <span>Delete all read messages</span>
        <Modal>
          <Modal.Open opens="delete">
            <Button size="medium" variation="danger" disabled={isDeleting}>
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              action="Delete"
              resourceName={` messages`}
              disabled={isDeleting}
              onConfirm={() => deleteLogs()}
            />
          </Modal.Window>
        </Modal>
      </StyledDiv>
    </>
  );
}

export default UpdateSettingsForm;
