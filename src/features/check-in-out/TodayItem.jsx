import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useCheckOut } from "./useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 9rem;
  gap: 1.2rem;
  align-items: center;
`;

const Guest = styled.div`
  font-weight: 500;
`;

// Styled Link
const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

TodayItem.propTypes = {
  activity: PropTypes.object,
};

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { checkout, isCheckingOut } = useCheckOut();

  return (
    <StyledTodayItem>
      <StyledLink to={`/booking/${id}`}>
        {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
        {status === "checked-in" && <Tag type="blue">Departing</Tag>}

        <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
        <Guest>{guests.fullName}</Guest>
        <div>{numNights} nights</div>
      </StyledLink>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {status === "checked-in" && (
        <Modal>
          <Modal.Open opens="checkout">
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
              size="small"
              variation="primary"
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          </Modal.Open>

          <Modal.Window name="checkout">
            <ConfirmDelete
              action="Check out"
              resourceName={`booking #${id}`}
              disabled={isCheckingOut}
              onConfirm={() => {
                checkout(id);
              }}
            />
          </Modal.Window>
        </Modal>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
