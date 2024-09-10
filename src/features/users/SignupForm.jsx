import { useForm } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUserByAdmin } from "./useUpdateUserByAdmin";
import { useCreateUserByAdmin } from "./useCreateUserByAdmin";

// Email regex: /\S+@\S+\.\S+/

const Select = styled.select`
  width: 200px;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

SignupForm.propTypes = {
  userToUpdate: PropTypes.object,
  onCloseModal: PropTypes.func,
};

function SignupForm({ userToUpdate = {}, onCloseModal }) {
  const { createNewUser, isCreating } = useCreateUserByAdmin();
  const { updateUserByAdmin, isUpdating } = useUpdateUserByAdmin();

  const isWorking = isCreating || isUpdating;

  const { userId, ...updateValues } = userToUpdate;
  const isUpdateSession = Boolean(userId);

  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  function onSubmit(userData) {
    if (isUpdateSession)
      updateUserByAdmin(
        {
          userId,
          userData,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else {
      const { fullName, email, password, role, phone } = userData;
      createNewUser(
        { fullName, email, password, role, phone },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      {!isUpdateSession && (
        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isWorking}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRow>
      )}

      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="number"
          id="phone"
          onWheel={(e) => e.target.blur()}
          disabled={isWorking}
          {...register("phone", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Role" error={errors?.role?.message}>
        <Select
          id="role"
          disabled={isWorking}
          defaultValue="user"
          {...register("role")}
        >
          <option>user</option>
          <option>admin</option>
        </Select>
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isWorking}
          {...register("password", {
            required: !isUpdateSession && "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isWorking}
          {...register("passwordConfirm", {
            required: !isUpdateSession && "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
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
        <Button disabled={isWorking}>
          {!isUpdateSession ? "Create new user" : "Update user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
