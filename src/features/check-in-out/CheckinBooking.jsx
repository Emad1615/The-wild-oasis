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
import { useSettings } from "./../settings/useSettings";

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading, error } = useBooking();
  const { settings, isLoading: isLoadingSetting } = useSettings();
  const { checkIn, isUpdating, checkInError } = useCheckin();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking]);
  if (isLoading || isLoadingSetting) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!confirmPaid) return null;
    if (!addBreakfast) {
      checkIn({ bookingId, breakfast: {} });
    } else {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id={"hasBreakfast"}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add a breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
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
          total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `
            ${formatCurrency(
              totalPrice + optionalBreakfastPrice
            )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})
          `}
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
