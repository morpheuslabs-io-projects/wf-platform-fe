import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import AppJourney from '@/components/molecules/AppJourney';
import { SignInWithOtherMethod } from './SignInWithOtherMethod';
import { SignInWithEmailPassword } from './SignInWithEmailPassword';
import SvgIcon from '@/components/atoms/SvgIcon';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Stack direction="row" p="32px">
        <Box sx={{ maxWidth: '493px', px: '80px', flexGrow: 1 }}>
        <Link to="/"><SvgIcon iconName="logo-full" /></Link>
          <Typography variant="header_2" component="h2" mt="71px">
            Get Start Now
          </Typography>

          <Typography variant="body" color="text.secondary" mt="8px">
            Enter your credentials to access your account
          </Typography>
          <Stack spacing="32px" mt="40px">
            <SignInWithOtherMethod />

            <Divider
              color="primary.contrastText"
              sx={{
                color: 'primary.contrastText',
                fontSize: '12px',
                fontWeight: 700,
                '&.MuiDivider-root::before, &.MuiDivider-root::after': {
                  borderTop: `thin solid ${theme.palette.primary.contrastText}`,
                },
              }}
            >
              OR
            </Divider>
            <SignInWithEmailPassword />
          </Stack>
        </Box>
        <Box sx={{ width: '676px' }}>
          <AppJourney />
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
