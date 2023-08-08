import { Stack, Typography } from '@mui/material';
import GoogleButton from '@/components/atoms/GoogleButton';
import SeedButton from '@/components/atoms/SeedButton';
import MetamaskButton from '@/components/atoms/MetamaskButton';

export const SignInWithOtherMethod = () => {
  const handleSignInWithGoogle = () => {
    console.log('Signing in with Google');
  };

  const handleSignInWithSeed = () => {
    console.log('Signing in with Seed');
  };

  const handleSignInWithMetamask = () => {
    console.log('Signing in with Metamask');
  };

  return (
    <div>
      <Typography variant="body" color="primary.contrastText">
        Continue with
      </Typography>
      <Stack direction="row" spacing="16px" mt="12px">
        <SeedButton onClick={handleSignInWithSeed} />
        <GoogleButton onClick={handleSignInWithGoogle} />
        <MetamaskButton onClick={handleSignInWithMetamask} />
      </Stack>
    </div>
  );
};
