import { Stack, Typography } from '@mui/material';
import GoogleButton from '@/components/atoms/GoogleButton';
import SeedButton from '@/components/atoms/SeedButton';
import MetamaskButton from '@/components/atoms/MetamaskButton';
import { useGoogleLogin } from '@react-oauth/google';
// import { signGoogleFn } from '@/services/googleAuth.service';
// import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import Cookies from 'js-cookie';

export const SignUpWithOtherMethod = () => {
  const navigate = useNavigate()
  const { keycloak } = useKeycloak();

  // API Sign With GG: Mutation
  // const {
  //   mutate: signGoogle,
  //   isLoading: ggLoading,
  //   error: ggError
  // } = useMutation((accessToken: string) => signGoogleFn(accessToken), {
  //   onSuccess: data => {
  //     console.log(data)
  //     // Redirect HERE
  //     navigate('/')
  //   }
  // })

  // ACTION: Sign With GG
  const handleSignUpWithGoogle = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (res) => {
      
      if (res && res.access_token) {
        // signGoogle(res.access_token.toString());
        Cookies.set('accessToken', res.access_token.toString());
        navigate('/inside')
      }
    },
    onError: () => console.log("Login Failed"),
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
