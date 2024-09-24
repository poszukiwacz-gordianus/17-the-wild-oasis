import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function CreateBookingForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    setValue,
    control,
  } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>Add</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
