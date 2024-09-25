import styled from "styled-components";
import PropTypes from "prop-types";

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

SelectGuestsNumber.propTypes = {
  cabin: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.func,
};

export default function SelectGuestsNumber({ cabin, name, id, register }) {
  return (
    <Select
      name={name}
      id={id}
      required
      {...register("numGuests", { required: "This field is required" })}
    >
      <option value="" key="">
        Select number of guests...
      </option>
      {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map((x) => (
        <option value={x} key={x}>
          {x} {x === 1 ? "guest" : "guests"}
        </option>
      ))}
    </Select>
  );
}
