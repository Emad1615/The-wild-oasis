import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreatingCabins } from "./useCreatingCabins";
import { useUpdateCabin } from "./useUpdateCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  text-transform: uppercase;
`;

function CreateCabinForm({ onCloseModal, cabinData = null, id }) {
  const isSesionEdit = Boolean(id);
  const { register, getValues, reset, formState, handleSubmit } = useForm({
    defaultValues: isSesionEdit ? cabinData : {},
  });
  const { errors } = formState;
  const { createCabin, isLoading: isCreating } = useCreatingCabins();
  const { updateCabin, isLoading: isUpdating } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;
  function handleOnSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!isSesionEdit)
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      updateCabin(
        { newCabin: { ...data, image: image }, id },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
  }
  return (
    <Form
      onSubmit={handleSubmit(handleOnSubmit)}
      type={`${onCloseModal ? "modal" : "regular"}`}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "The value must be at least 1 ",
            },
          })}
        />
        {errors?.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
        {errors?.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less than the regular price",
          })}
        />
        {errors?.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors?.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: !isSesionEdit ? "This field is required" : false,
          })}
        />
        {errors?.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
