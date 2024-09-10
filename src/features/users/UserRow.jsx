import styled from "styled-components";
import PropTypes from "prop-types";
import { HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import SignupForm from "./SignupForm";

import { useDeleteUserByAdmin } from "./useDeleteUserByAdmin";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const StyledDiv = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  user: PropTypes.object,
};

function CabinRow({ user }) {
  const { deleteUserByAdmin, isDeleting } = useDeleteUserByAdmin();

  const {
    id: userId,
    email,
    phone,
    user_metadata: { avatar, fullName, role },
  } = user;

  const userToUpdate = { userId, phone, fullName, role };

  return (
    <>
      <Table.Row>
        <Img src={avatar || "default-user.jpg"} />
        <User>{fullName}</User>
        <Email>{email}</Email>
        <StyledDiv>{phone || "No phone number"}</StyledDiv>
        <StyledDiv>{role}</StyledDiv>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toogle id={userId} />
              <Menus.List id={userId}>
                {/* {Edit} */}
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                {/* {Delete} */}
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />} disabled={false}>
                    Delete user
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <SignupForm userToUpdate={userToUpdate} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={`user ${fullName}`}
                  disabled={isDeleting}
                  onConfirm={() => deleteUserByAdmin({ userId })}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
