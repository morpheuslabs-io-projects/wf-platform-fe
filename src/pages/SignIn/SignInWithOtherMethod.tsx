import { Stack, Typography } from '@mui/material';
import GoogleButton from '@/components/atoms/GoogleButton';
import SeedButton from '@/components/atoms/SeedButton';
import MetamaskButton from '@/components/atoms/MetamaskButton';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useKeycloak } from '@react-keycloak/web';
import useGoogleToken from '@/hooks/useGoogleToken';

export const SignInWithOtherMethod = () => {
  const navigate = useNavigate();
	const { getGGTokenId } = useGoogleToken()
	const { keycloak } = useKeycloak();

	// ACTION: Sign With GG
	const handleSignUpWithGoogle = useGoogleLogin({
		flow: 'implicit',
		onSuccess: async (res) => {
      const wfBase = process.env.REACT_APP_WF_URL
      const redirectUrl = wfBase + '/workflows'
			if (res && res.access_token) {
				getGGTokenId(res.access_token.toString())
        setTimeout(() => document.location.href = redirectUrl, 1000);
			}
		},
		onError: () => console.log('Login Failed'),
	});

  const handleSignUpWithSeed = () => {
    keycloak.login()
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
      <SeedButton onClick={handleSignUpWithSeed} />
        <GoogleButton onClick={handleSignUpWithGoogle} />
        <MetamaskButton onClick={handleSignInWithMetamask} />
      </Stack>
    </div>
  );
};
