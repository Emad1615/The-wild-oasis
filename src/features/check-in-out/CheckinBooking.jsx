import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useCheckin } from "./useCheckin";
import Box from "../../ui/Box";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading, error } = useBooking();
  const { checkIn, isUpdating, checkInError } = useCheckin();
  const [confirmPaid, setConfirmPaid] = useState(false);
  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking]);
  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;
  function handleCheckin() {
    if (!confirmPaid) return null;
    checkIn();
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          id={"isPaid"}
          checked={confirmPaid}
          disabled={confirmPaid || isUpdating}
          onChange={() =>
            setConfirmPaid((prevConfirmePaid) => !prevConfirmePaid)
          }
        >
          I confirm that <strong>{booking.guests.fullName}</strong> has paid the
          total amount of {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={isUpdating || !confirmPaid}
          id="isPaid"
        >
          {!isUpdating ? `Check in booking #${bookingId}` : "Loading..."}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
