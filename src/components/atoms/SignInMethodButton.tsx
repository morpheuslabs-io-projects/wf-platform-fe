import { IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface SignInMethodButtonProps {
  onClick: () => void;
  children: ReactNode;
}
export const SignInMethodButton = ({
  onClick,
  children,
}: SignInMethodButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        border: 'solid 1px',
        borderColor: 'primary.contrastText',
        borderRadius: 0,
        cursor: 'pointer',
        gap: '12px',
        width: '154px',
        height: '54px',
      }}
    >
      {children}
    </IconButton>
  );
};
