import Spinner from "./../../ui/Spinner";
import Form from "./../../ui/Form";
import FormRow from "./../../ui/FormRow";
import Input from "./../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

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
  const {
    updatingSetting,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateSettings();
  if (isLoading) return <Spinner />;
  function handleBlur(value, field) {
    if (value) updatingSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={minBookingLength}
          type="number"
          onBlur={(e) => handleBlur(e.currentTarget.value, "minBookingLength")}
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          type="number"
          onBlur={(e) => handleBlur(e.currentTarget.value, "maxBookingLength")}
          disabled={isUpdating}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          type="number"
          onBlur={(e) =>
            handleBlur(e.currentTarget.value, "maxGuestsPerBooking")
          }
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          type="number"
          onBlur={(e) => handleBlur(e.currentTarget.value, "breakfastPrice")}
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
