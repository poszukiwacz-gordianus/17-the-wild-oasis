import AddBooking from "../features/bookings/AddBooking";
import AddGuest from "../features/bookings/AddGuest";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

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
        <Heading as="h2">Register a new booking</Heading>
        <AddBooking />
      </Row>
    </>
  );
}

export default Registration;
