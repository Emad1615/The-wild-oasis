import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiOutlineDuplicate } from "react-icons/hi";
import Modal from "./../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useCreatingCabins } from "./useCreatingCabins";
import { useDeleteCabin } from "./useDeleteCabin";
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const {
    id,
    created_at,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;
  const { createCabin, isLoading: isDuplicating } = useCreatingCabins();
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }
  const { deleteCabin, isLoading: isDeleting } = useDeleteCabin();
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiOutlineDuplicate />}
                  title={"Duplucate"}
                  onClick={handleDuplicate}
                  disabled={isDuplicating}
                />
                <Modal.Open opens={"edit"}>
                  <Menus.Button icon={<HiOutlinePencil />} title={"Edit"} />
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Button icon={<HiOutlineTrash />} title={"Delete"} />
                </Modal.Open>
              </Menus.List>
              <Modal.Window name={"edit"}>
                <CreateCabinForm cabinData={cabin} id={id} />
              </Modal.Window>
              <Modal.Window name={"delete"}>
                <ConfirmDelete
                  resourceName={"cabin"}
                  onConfirm={() => deleteCabin(id)}
                  disabled={isDeleting}
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
