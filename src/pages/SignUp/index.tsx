import {
  Box,
  Container,
  Divider,
  Stack, useTheme
} from '@mui/material';
import AppJourney from '@/components/molecules/AppJourney';
import { SignUpWithOtherMethod } from './SignUpWithOtherMethod';
import { SignUpWithEmailPassword } from './SignUpWithEmailPassword';
import SvgIcon from '@/components/atoms/SvgIcon';
import { Link } from 'react-router-dom';
import useStyles from "./style";

const SignUp = () => {
  const theme = useTheme();
  const classes = useStyles();


  return (
    <Container maxWidth="xl">
      <Stack direction="row" p="32px">
        <Box sx={{ maxWidth: '493px', px: '80px', flexGrow: 1 }}>
          <Link to="/">
          <SvgIcon iconName="logo-full" /></Link>
          <div className={classes.textSignUp}>
            Sign up with
          </div>
          <Stack spacing="32px">
            <SignUpWithOtherMethod />
            <Divider
              color="primary.contrastText"
              sx={{
                opacity: 0.6,
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
