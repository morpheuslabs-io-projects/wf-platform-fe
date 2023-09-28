import { Input } from "@/components/atoms/Input";
import Link from "@/components/atoms/Link";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { ROUTE_PATH } from "@/constants/AppConfig";
import { emailExpression } from "@/helper";
import { CookiesHelper } from "@/helper/cookies";
import { signIn } from "@/services/auth.service";
import { ErrorResponse, SignInData, User } from "@/types";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInWithEmailPassword = () => {
  const navigate = useNavigate();
  const mutation = useMutation<AxiosResponse<User>, ErrorResponse, SignInData>(
    signIn,
    {
      onSuccess: ({ data }) => {
        const { token } = data;
        if (!token) {
          return;
        }
        CookiesHelper.set("accessToken", token);
        navigate("/");
      },
    }
  );

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { email, password } = formValue;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValue({ ...formValue, email: value });

    const isValid = emailExpression.test(value);
    setEmailError(isValid ? "" : "Invalid email");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValue({ ...formValue, password: value });
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValue);
    mutation.mutate(formValue);
  };

  const isDisabled = !(email && password) || !!(emailError || passwordError);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="24px">
        <Input
          value={email}
          onChange={handleEmailChange}
          label="User ID"
          placeholder="Enter your User ID"
          errorMessage={emailError}
        />

        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          placeholder="Enter your password"
          errorMessage={passwordError}
        />
      </Stack>

      <Link to="/">Forgot password?</Link>

      <div>
        <Button
          type="submit"
          variant="primary"
          sx={{ marginTop: "32px", width: "192px" }}
          disabled={isDisabled}
          endIcon={<ArrowCircleRightIcon />}
        >
          LOGIN
        </Button>
        <Stack direction="row" spacing="12px" mt="16px">
          <Typography>New to Workflow?</Typography>
          <Link to={ROUTE_PATH.SIGN_UP}>Sign up</Link>
        </Stack>
      </div>
    </form>
  );
};
