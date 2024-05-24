import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiOutlineArrowUp } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkOut, isCheckout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"Booking"} />;
  const { status, id: bookingId } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button disabled={isCheckout} onClick={() => checkOut(bookingId)}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variation="danger">Delete booking </Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1), // or onSuccess
                })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
