import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import MorpheusLogoFull from '@/assets/icons/morpheus-logo-full.svg';
import SCLogo from '@/assets/icons/sc-logo.svg';

const HeaderComponent: React.FC = () => {
	const navigate = useNavigate();

	return (
		<AppBar
			position="static"
			sx={{
				height: '100px',
				bgcolor: 'background.default',
				boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
				position: 'sticky',
				top: 0,
				zIndex: 10,
			}}
		>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{
						height: '100px',
						bgcolor: 'background.default',
						justifyContent: 'space-between',
					}}
				>
					<Toolbar
						sx={{ cursor: 'pointer' }}
						onClick={() => navigate('/')}
					>
						<Box
							component="img"
							src={MorpheusLogoFull}
							alt=""
							sx={{ display: { xs: 'none', sm: 'flex' } }}
						/>
						<Box
							component="img"
							src={SCLogo}
							alt=""
							sx={{ display: { xs: 'flex', sm: 'none' } }}
						/>
					</Toolbar>

					<Box>
						<Button href="/sign-up" variant="secondary" sx={{ mx: 1 }}>
							Sign up
						</Button>
						<Button href="/sign-in" variant="ghost">Login</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default HeaderComponent;
