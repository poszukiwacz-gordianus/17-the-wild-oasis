import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((show) => !show)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenModal((show) => !show)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
