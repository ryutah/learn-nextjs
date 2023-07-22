import { TextField, Stack, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type SampleFormProps = {
  onSubmit?: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName?: string;
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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SampleFormInput>();

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
    <div style={{ width: "30rem", margin: "0 auto", textAlign: "center" }}>
      <h1>Sample Form</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="standard"
                error={errors.firstName && true}
                helperText={errors.firstName && `firstName is required`}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="standard"
                error={errors.lastName && true}
                helperText={errors.lastName && `lastName is required`}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                variant="standard"
                error={errors.email && true}
                helperText={errors.email && `lastName is required`}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="standard"
                error={errors.password && true}
                helperText={errors.password && `lastName is required`}
              />
            )}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
