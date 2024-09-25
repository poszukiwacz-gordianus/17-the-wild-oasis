import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SignupForm from "./SignupForm";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button>Add new user</Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <SignupForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
