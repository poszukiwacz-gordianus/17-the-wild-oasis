import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { differenceInDays } from "date-fns";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import SelectGuest from "../../ui/SelectGuest";
import Spinner from "../../ui/Spinner";
import DateArea from "../../ui/DateArea";
import SelectCabin from "../../ui/SelectCabin";
import CabinInfo from "../../ui/CabinInfo";
import SelectGuestsNumber from "../../ui/SelectGuestsNumber";

import useGuests from "./useGuests";
import useCreateBooking from "./useCreateBooking";
import { useSettings } from "../settings/useSettings";
import { useCabins } from "../cabins/useCabins";
import { setProperDatesTime } from "../../utils/helpers";

const P = styled.p`
  font-weight: 700;
  width: 80%;
`;

const Select = styled.select`
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateReservationForm() {
  const { register, handleSubmit, formState, setValue, control } = useForm();
  const { errors } = formState;

  const { createBooking, isCreating } = useCreateBooking();
  const { guests, isLoading } = useGuests();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { settings } = useSettings();

  console.log(settings);

  const isWorking = isLoading || isLoadingCabins || isCreating;

  const [range, setRange] = useState({ from: undefined, to: undefined });

  const cabinId = useWatch({ control, name: "cabinId" });
  const guestId = useWatch({ control, name: "guestId" });
  const hasBreakfastForm = useWatch({ control, name: "hasBreakfast" });
  const guestsNumber = useWatch({ control, name: "numGuests" });

  if (isWorking) return <Spinner />;

  const selectedCabin =
    cabins?.find((cabin) => cabin.id === Number(cabinId)) || undefined;
  const numNights = differenceInDays(range.to, range.from) || 0;
  const breakfast =
    hasBreakfastForm === "true"
      ? settings?.breakfastPrice * guestsNumber * numNights
      : 0;
  const totalPrice =
    numNights * (selectedCabin?.regularPrice - selectedCabin?.discount) +
    breakfast;

  function onSubmit(formData) {
    const { startDate, endDate } = setProperDatesTime(
      formData.dates.from,
      formData.dates.to
    );

    const booking = {
      startDate,
      endDate,
      numNights,
      numGuests: Number(formData.numGuests),
      cabinPrice:
        (selectedCabin.regularPrice - selectedCabin.discount) * numNights,
      extrasPrice: breakfast,
      totalPrice,
      status: "unconfirmed",
      hasBreakfast: hasBreakfastForm === "true",
      isPaid: false,
      observations: formData.observations,
      cabinId: Number(cabinId),
      guestId: Number(guestId),
    };

    return createBooking({ booking });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Guest" error={errors?.guestId?.message}>
        <SelectGuest
          guests={guests}
          name="guestId"
          id="guestId"
          register={register}
        />
      </FormRow>

      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        <SelectCabin
          cabins={cabins}
          name="cabinId"
          id="cabinId"
          register={register}
        />
      </FormRow>

      {cabinId && guestId && (
        <>
          <CabinInfo selectedCabin={selectedCabin} />
          <FormRow
            label="Reservation dates"
            error={errors?.startDate?.message || errors?.endDate?.message}
          >
            <DateArea
              setValue={setValue}
              cabinId={Number(cabinId)}
              guestId={Number(guestId)}
              range={range}
              setRange={setRange}
              minBookingLength={settings?.minBookingLength}
              maxBookingLength={settings?.maxBookingLength}
            />
          </FormRow>
          <FormRow label="How many guests?" error={errors?.numGuests?.message}>
            <SelectGuestsNumber
              cabin={selectedCabin}
              name="numGuests"
              id="numGuests"
              register={register}
            />
          </FormRow>
          <FormRow
            label={`Add breakfast | €${settings.breakfastPrice} per person per night`}
          >
            <Select
              name="hasBreakfast"
              id="hasBreakfast"
              defaultValue={false}
              {...register("hasBreakfast")}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </Select>
          </FormRow>
          <FormRow label="Observations">
            <TextArea
              id="observations"
              name="observations"
              {...register("observations")}
            ></TextArea>
          </FormRow>
          <FormRow label="Total Price">
            <P>
              &#8364;
              {totalPrice} {breakfast > 0 && `(Breakfast €${breakfast})`}
            </P>
          </FormRow>
        </>
      )}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>Register</Button>
      </FormRow>
    </Form>
  );
}

export default CreateReservationForm;
