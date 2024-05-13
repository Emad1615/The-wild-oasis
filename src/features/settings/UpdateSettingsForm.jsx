import Spinner from "./../../ui/Spinner";
import Form from "./../../ui/Form";
import FormRow from "./../../ui/FormRow";
import Input from "./../../ui/Input";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
    error,
  } = useSettings();
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={minBookingLength}
          type="number"
          onBlur={(e) => {}}
          disabled={""}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          type="number"
          onBlur={(e) => {}}
          disabled={""}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          type="number"
          onBlur={(e) => {}}
          disabled={""}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          type="number"
          onBlur={(e) => {}}
          disabled={""}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
