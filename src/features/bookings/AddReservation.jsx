import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function AddReservation() {
  return (
    <div>
      <Link to="/new-reservation">
        <Button>Register</Button>
      </Link>
    </div>
  );
}

export default AddReservation;
