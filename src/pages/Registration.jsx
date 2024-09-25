import AddGuest from "../features/bookings/AddGuest";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddReservation from "../features/bookings/AddReservation";

function Registration() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Registration</Heading>
      </Row>
      <Row>
        <Heading as="h2">Register a new guest</Heading>
        <AddGuest />
      </Row>
      <Row>
        <Heading as="h2">Register a new reservation</Heading>
        <AddReservation />
      </Row>
    </>
  );
}

export default Registration;
