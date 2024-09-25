import { isPast, isSameDay, startOfToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styled from "styled-components";
import PropTypes from "prop-types";

import SpinnerMini from "../ui/SpinnerMini";

import useBookedDates from "../features/bookings/useBookedDates";
import { isAlreadyBooked } from "../utils/helpers";

const DayArea = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;

const DayPickerStyled = styled(DayPicker)`
  color: var(--color-grey-900);
  font-weight: 600;

  & .rdp-root {
    --rdp-cell-size: 32px; /* No need for !important */
    font-weight: 600;
    --rdp-accent-color: var(--color-brand-700);
    --rdp-accent-background-color: var(--color-brand-700);
    --rdp-background-color: var(--color-brand-700) !important;
    margin: 0; /* No need for !important */
  }
`;

DateArea.propTypes = {
  setValue: PropTypes.func,
  cabinId: PropTypes.number,
  guestId: PropTypes.number,
  range: PropTypes.object,
  setRange: PropTypes.func,
  minBookingLength: PropTypes.number,
  maxBookingLength: PropTypes.number,
};

function DateArea({
  setValue,
  cabinId,
  guestId,
  range,
  setRange,
  minBookingLength,
  maxBookingLength,
}) {
  const { bookedDates, isLoading } = useBookedDates(cabinId, guestId);

  if (isLoading) return <SpinnerMini />;

  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const handleDateSelect = (selectedRange) => {
    if (!selectedRange || isAlreadyBooked(selectedRange, bookedDates)) {
      setRange({ from: undefined, to: undefined });
    } else {
      setRange(selectedRange);
      setValue("dates", selectedRange); // Manually update form value
    }
  };

  return (
    <DayArea>
      <DayPickerStyled
        mode="range"
        onSelect={handleDateSelect}
        selected={displayedRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        numberOfMonths={2}
        captionLayout="dropdown"
        hideNavigation
        disabled={(curDate) =>
          (isPast(curDate) && curDate < startOfToday()) ||
          bookedDates?.some((date) => isSameDay(date, curDate))
        }
      />
    </DayArea>
  );
}

export default DateArea;
