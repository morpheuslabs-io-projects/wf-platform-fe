import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import AppJourney from '@/components/molecules/AppJourney';
import { SignUpWithOtherMethod } from './SignUpWithOtherMethod';
import { SignUpWithEmailPassword } from './SignUpWithEmailPassword';
import SvgIcon from '@/components/atoms/SvgIcon';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Stack direction="row" p="32px">
        <Box sx={{ maxWidth: '493px', px: '80px', flexGrow: 1 }}>
          <Link to="/">
          <SvgIcon iconName="logo-full" /></Link>

          <Typography variant="header_2" component="h2" mt="71px">
            Sign up
          </Typography>
          <Stack spacing="32px" mt="40px">
            <SignUpWithOtherMethod />
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
            <SignUpWithEmailPassword />
          </Stack>
        </Box>

        <Box sx={{ width: '676px' }}>
          <AppJourney />
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;
