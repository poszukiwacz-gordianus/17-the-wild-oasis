import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import SelectCountry from "../../ui/SelectCountry";

import { useCreateGuest } from "./useCreateGuest";
import { useCountries } from "./useCountries";

CreateGuestForm.propTypes = {
  onCloseModal: PropTypes.func,
};

function CreateGuestForm({ onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const { countries, isLoading } = useCountries();

  const isWorking = isCreating;

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(formData) {
    const [nationality, countryFlag] = formData.nationality.split("%");

    const newGuest = {
      ...formData,
      nationality: nationality,
      countryFlag: countryFlag,
    };

    createGuest(newGuest, {
      onSuccess: () => {
        onCloseModal();
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
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
            pattern: {
              value: /^[a-zA-Z0-9]{6,12}$/,
              message: "Please provide a valid National ID",
            },
          })}
        />
      </FormRow>

      {/* //Nationality */}
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        {isLoading ? (
          <Input
            type="text"
            id="nationality"
            disabled={isWorking}
            required
            {...register("nationality", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Country should be at least 4 characters long",
              },
            })}
          />
        ) : !countries ? (
          <Input
            type="text"
            id="nationality"
            disabled={isWorking}
            required
            {...register("nationality", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Country should be at least 4 characters long",
              },
            })}
          />
        ) : (
          <SelectCountry
            countries={countries}
            name="nationality"
            id="nationality"
            register={register}
          />
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>Register</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
