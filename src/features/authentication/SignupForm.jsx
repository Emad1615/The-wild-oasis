import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/
const FormActions = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`;
function SignupForm() {
  const { register, formState, getValues, reset, handleSubmit } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = useSignUp();
  function onSubmit({ email, password, fullName }) {
    signUp(
      { email, password, fullName },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please write valid email address",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues()?.password || "Password not matched",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormActions>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormActions>
    </Form>
  );
}

export default SignupForm;
