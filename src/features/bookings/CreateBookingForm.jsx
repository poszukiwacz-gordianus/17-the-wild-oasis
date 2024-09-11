import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useCabins } from "../cabins/useCabins";
import { useOccupiedCabins } from "../cabins/useOccupiedCabins";
import styled from "styled-components";

const Calendar = styled.div`
  display: flex;
`;

function CreateBookingForm({ onCloseModal }) {
  const { cabins } = useCabins();
  const { getOccupiedCabins, isLoading } = useOccupiedCabins();

  const [selectedCabin, setSelectedCabin] = useState({});

  const [occupiedCabins, setOccupiedCabins] = useState([]);

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

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  const calculateNights = (start, end) => {
    if (start && end) {
      const diffDays = Math.floor(
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
      );
      return diffDays > 0 ? diffDays : "End date must be after the start date";
    }
    return "";
  };

  useEffect(() => {
    setValue("numNights", calculateNights(startDate, endDate));
  }, [setValue, startDate, endDate]);

  useEffect(() => {
    console.log("guests");
    if (startDate && endDate) {
      getOccupiedCabins(
        { startDate, endDate },
        {
          onSuccess: (data) => {
            setOccupiedCabins(data);
          },
        }
      );
    }
  }, [getOccupiedCabins, startDate, endDate]);

  //Filter available cabins
  let availableCabins = cabins?.filter(
    (cabin) =>
      !occupiedCabins.some((occupation) => occupation.cabinId === cabin.id)
  );

  //Sort available cabins by name
  availableCabins = availableCabins?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  function handleSelect(e) {
    setSelectedCabin(
      cabins.find((cabin) => cabin.id === Number(e.target.value))
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Calendar>
        <label>Start date</label>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />

        <label>End date</label>
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
        />

        <label>Nights</label>
        <input type="text" id="numNights" readOnly {...register("numNights")} />
      </Calendar>

      <FormRow label="Available Cabins">
        <select {...register("cabinId")} onChange={handleSelect}>
          {availableCabins?.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Additional Guests">
        <Input
          type="number"
          id="numGuests"
          onWheel={(e) => e.target.blur()}
          {...register("numGuests")}
        />
      </FormRow>

      <FormRow label="Price for Night">
        <Input type="number" readOnly value={selectedCabin.regularPrice} />
      </FormRow>
      <FormRow label="Max Capacity">
        <Input type="number" readOnly value={selectedCabin.maxCapacity} />
      </FormRow>
      <FormRow label="Description">
        <Input type="text" readOnly value={selectedCabin.description} />
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
