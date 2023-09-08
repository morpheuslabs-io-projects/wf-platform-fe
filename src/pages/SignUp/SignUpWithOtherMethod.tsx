import { Stack, Typography } from '@mui/material';
import GoogleButton from '@/components/atoms/GoogleButton';
import SeedButton from '@/components/atoms/SeedButton';
import MetamaskButton from '@/components/atoms/MetamaskButton';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import useGoogleToken from '@/hooks/useGoogleToken';

export const SignUpWithOtherMethod = () => {
  const navigate = useNavigate();
	const { getGGTokenId } = useGoogleToken()
	const { keycloak } = useKeycloak();

	// ACTION: Sign With GG
	const handleSignUpWithGoogle = useGoogleLogin({
		flow: 'implicit',
		onSuccess: async (res) => {
			if (res && res.access_token) {
				getGGTokenId(res.access_token.toString())
        setTimeout(() => navigate('/inside'), 1000);
			}
		},
		onError: () => console.log('Login Failed'),
	});

  const handleSignUpWithSeed = () => {
    keycloak.login()
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
