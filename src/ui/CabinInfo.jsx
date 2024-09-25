import styled from "styled-components";
import PropTypes from "prop-types";

const CabinContent = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 2.4rem;
  margin-top: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const P = styled.p`
  font-weight: 700;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
`;

CabinInfo.propTypes = {
  selectedCabin: PropTypes.object,
};

export default function CabinInfo({
  selectedCabin: { description, regularPrice, discount, maxCapacity },
}) {
  return (
    <CabinContent>
      <Price>
        <Label>Regular Price / Night</Label>
        <P> &#8364;{regularPrice}</P>
        {discount > 0 && (
          <>
            <Label>Discount</Label>
            <P> &#8364;{discount}</P>
            <Label>Total Price / Night</Label>
            <P> &#8364;{regularPrice - discount} </P>
          </>
        )}
        ||
        <Label>Max Capacity</Label>
        <P>{maxCapacity} </P>
      </Price>
      <Label>Description</Label>
      <p>{description}</p>
    </CabinContent>
  );
}
