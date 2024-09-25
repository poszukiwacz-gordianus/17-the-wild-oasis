import PropTypes from "prop-types";
import styled from "styled-components";

SelectCabin.propTypes = {
  cabins: PropTypes.array,
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

export default function SelectCabin({ cabins, name, id, register }) {
  return (
    <Select
      name={name}
      id={id}
      required
      {...register(`${id}`, {
        required: "This field is required",
      })}
    >
      <option value="">Select cabin...</option>
      {cabins?.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </Select>
  );
}
