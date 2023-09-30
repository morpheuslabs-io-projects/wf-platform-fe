import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { emailExpression } from "@/helper";
import { signUp } from "@/services/auth.service";
import { ErrorResponse, SignUpData, User } from "@/types";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "@/components/atoms/Link";
import { ROUTE_PATH } from "@/constants/AppConfig";

export const SignUpWithEmailPassword = () => {
  const navigate = useNavigate();
  const mutation = useMutation<AxiosResponse<User>, ErrorResponse, SignUpData>(
    signUp,
    {
      onSuccess: () => {
        navigate(ROUTE_PATH.SIGN_IN);
      },
    }
  );
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { email, password, confirmPassword, terms } = formValue;

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

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValue({ ...formValue, confirmPassword: value });
    if (password !== value) {
      setConfirmPasswordError("Password and Confirm password is not the same");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleTermsChange = () => {
    setFormValue({ ...formValue, terms: !terms });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValue);
    mutation.mutate(formValue);
  };

  const isDisabled =
    !(email && password && confirmPassword && terms) ||
    !!(emailError || passwordError || confirmPasswordError);

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
          placeholder="********"
          errorMessage={passwordError}
        />
        <PasswordInput
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label="Re-enter password"
          placeholder="********"
          errorMessage={confirmPasswordError}
        />
        <Stack direction="row" alignItems="center">
          <Checkbox
            checked={terms}
            onChange={handleTermsChange}
            sx={{
              padding: 0,
              marginRight: "12px",
            }}
          />
          <Typography variant="body" mr="4px">
            I agree to the
          </Typography>
          <Link to="/sign-up">Term & Policy</Link>
        </Stack>
      </Stack>

      <div>
        <Button
          type="submit"
          variant="primary"
          sx={{ marginTop: "32px", width: "192px" }}
          disabled={isDisabled}
          endIcon={<ArrowCircleRightIcon />}
        >
          SIGN UP
        </Button>
        <Stack direction="row" spacing="12px" mt="16px">
          <Typography>Have an account?</Typography>
          <Link to={ROUTE_PATH.SIGN_IN}>Login</Link>
        </Stack>
      </div>
    </form>
  );
};
