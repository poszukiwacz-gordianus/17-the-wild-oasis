import PropTypes from "prop-types";
import styled from "styled-components";

SelectCountry.propTypes = {
  countries: PropTypes.array,
  defaultCountry: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.func,
};

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

export default function SelectCountry({ countries, name, id, register }) {
  return (
    <Select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      required
      {...register(`${id}`, {
        required: "This field is required",
      })}
    >
      <option value="">Select country...</option>
      {countries?.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </Select>
  );
}
