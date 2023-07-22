import {TextField, Stack, Button} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

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

export default function SampleForm({onSubmit}: SampleFormProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const emailDuplicateCheck = async (email: string): Promise<boolean> => {
    // check email format and return false if it's not valid
    const emailCheck = z.string().email()
    const {success} = emailCheck.safeParse(email)
    if (!success) return false

    clearTimeout(timer)

    await new Promise((resolve) => {
      const newTimer = setTimeout(resolve, 300)
      setTimer(newTimer)
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
    formState: {errors, isSubmitting},
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
    <div style={{width: "30rem", margin: "0 auto", textAlign: "center"}}>
      <h1>Sample Form</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2}>
          <Controller
            name="firstName"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                label="First Name"
                variant="standard"
                error={errors.firstName && true}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                label="Last Name"
                variant="standard"
                error={errors.lastName && true}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                variant="standard"
                error={errors.email && true}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="standard"
                error={errors.password && true}
                helperText={errors.password?.message}
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
