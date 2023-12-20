import { SignInMethodButton } from './SignInMethodButton';
import SvgIcon from './SvgIcon';
import { Typography } from '@mui/material';

const SeedButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <SignInMethodButton onClick={onClick}>
      <SvgIcon iconName="seed" />
      <Typography variant="body_bold">SEED</Typography>
    </SignInMethodButton>
  );
};

export default SeedButton;
