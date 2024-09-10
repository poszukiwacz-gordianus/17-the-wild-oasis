import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

import { useCreateGuest } from "./useCreateGuest";

CreateGuestForm.propTypes = {
  onCloseModal: PropTypes.func,
};

function CreateGuestForm({ onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();

  const isWorking = isCreating;

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(newGuest) {
    createGuest(newGuest, {
      onSuccess: () => {
        onCloseModal?.();
        reset();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* FullName */}
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          autoFocus
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* //Email  */}
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message:
                "Please provide a valid email adress. Exapmle: jane@email.com",
            },
          })}
        />
      </FormRow>

      {/* //NationalId  */}
      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* //Nationality */}
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register("nationality", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Country should be at least 4 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>Add guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
