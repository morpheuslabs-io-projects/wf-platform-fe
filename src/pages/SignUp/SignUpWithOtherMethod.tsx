import { Stack, Typography } from '@mui/material';
import GoogleButton from '@/components/atoms/GoogleButton';
import SeedButton from '@/components/atoms/SeedButton';
import MetamaskButton from '@/components/atoms/MetamaskButton';

export const SignUpWithOtherMethod = () => {
  const handleSignUpWithGoogle = () => {
    console.log('Signing up with Google');
  };

  const handleSignUpWithSeed = () => {
    console.log('Signing up with Seed');
  };

  const handleSignUpWithMetamask = () => {
    console.log('Signing up with Metamask');
  };

  return (
    <div>
      <Typography variant="body" color="primary.contrastText">
        Continue with
      </Typography>
      <Stack direction="row" spacing="16px" mt="12px">
        <SeedButton onClick={handleSignUpWithSeed} />
        <GoogleButton onClick={handleSignUpWithGoogle} />
        <MetamaskButton onClick={handleSignUpWithMetamask} />
      </Stack>
    </div>
  );
};
