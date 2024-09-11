import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();
  const { errors } = formState;

  function onSubmit() {
    console.log("sumbit");
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
          onChange={(e) =>
            setValue(
              "numNights",
              Math.floor(
                (new Date(getValues().endDate) - new Date(e.target.value)) /
                  (1000 * 60 * 60 * 24)
              ) || ""
            )
          }
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              if (value <= getValues().startDate) {
                return "End date must be after the start date";
              }
            },
          })}
          onChange={(e) =>
            setValue(
              "numNights",
              Math.floor(
                (new Date(e.target.value) - new Date(getValues().startDate)) /
                  (1000 * 60 * 60 * 24)
              )
            )
          }
        />
      </FormRow>

      <FormRow label="Nights" error={errors?.numNights?.message}>
        <Input type="text" id="numNights" readOnly {...register("numNights")} />
      </FormRow>

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
