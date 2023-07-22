import { Container, TextField, Stack, Button } from "@mui/material";
import {
  useForm,
  Control,
  useController,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { HTMLInputTypeAttribute, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// see: https://zenn.dev/yuitosato/articles/292f13816993ef#react-hook-form%E3%81%AB%E4%BE%9D%E5%AD%98%E3%81%99%E3%82%8B-inputcontrol.tsx
type MyTextFieldProps<FORM_TYPE extends FieldValues> = {
  name: FieldPath<FORM_TYPE>;
  control: Control<FORM_TYPE>;
  label: string;
  type?: HTMLInputTypeAttribute;
};

function MyTextField<FORM_TYPE extends FieldValues>(
  props: MyTextFieldProps<FORM_TYPE>
) {
  const { field, fieldState } = useController(props);

  return (
    <TextField
      {...field}
      type={props.type}
      label={props.label}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      variant="standard"
    />
  );
}

type SampleFormProps = {
  onSubmit?: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }) => void;
};

interface SampleFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SampleForm({ onSubmit }: SampleFormProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const emailDuplicateCheck = async (email: string): Promise<boolean> => {
    // check email format and return false if it's not valid
    const emailCheck = z.string().email();
    const { success } = emailCheck.safeParse(email);
    if (!success) return false;

    clearTimeout(timer);

    await new Promise((resolve) => {
      const newTimer = setTimeout(resolve, 300);
      setTimer(newTimer);
    });

    console.log("Called!");
    return !email.includes("duplicate");
  };

  const Sample = z.object({
    firstName: z.string().max(50),
    lastName: z.string().max(50).optional(),
    email: z.string().email().refine(emailDuplicateCheck, "duplicate email"),
    password: z.string().min(8).max(50),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SampleFormInput>({
    resolver: zodResolver(Sample),
  });

  const submitHandler = async (e: SampleFormInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit?.({
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      password: e.password,
    });
  };

  return (
    <Container style={{ width: "50%", textAlign: "center" }}>
      <h1>Sample Form</h1>

      <Stack
        spacing={3}
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <MyTextField label="First Name" name="firstName" control={control} />
        <MyTextField label="Last Name" name="lastName" control={control} />
        <MyTextField
          label="Email"
          name="email"
          type="email"
          control={control}
        />
        <MyTextField
          label="Password"
          name="password"
          type="password"
          control={control}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
