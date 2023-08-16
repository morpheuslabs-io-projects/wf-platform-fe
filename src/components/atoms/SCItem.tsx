import { FC, MouseEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { ISCItem, ISCStatus } from '@/types/sc.type';
import ActionIcon from '@/assets/icons/3dot.svg';
import NextIcon from '@/assets/icons/next-black.svg';

const SCItem: FC<{ item: ISCItem; isEdit?: boolean }> = ({
	item,
	isEdit = true,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card
			sx={{
				padding: '24px',
				justifyContent: 'center',
				alignItems: 'center',
				border: 0,
				boxShadow: 'none',
				'&:hover': {
					cursor: 'pointer',
				},
				height: 'calc(100% - 48px)',
			}}
		>
			<CardHeader
				sx={{ padding: 0 }}
				avatar={<img src={item.icon} alt="" />}
				action={
					isEdit && (
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								handleClick(e);
							}}
						>
							<img src={ActionIcon} alt="" />
						</IconButton>
					)
				}
			/>
			<Menu
				id="actions"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
					sx: {
						p: 0,
					},
				}}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.12))',
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							borderRadius: 0,
							py: '22px',
							gap: 1,
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem
					onClick={handleClose}
					sx={{
						py: '8px',
						'&:hover': {
							backgroundColor: 'unset',
						},
						'&:active': {
							backgroundColor: 'unset',
						},
					}}
				>
					<Typography variant="body">Edit</Typography>
				</MenuItem>
				<MenuItem
					onClick={handleClose}
					sx={{
						py: '8px',
						'&:hover': {
							backgroundColor: 'unset',
						},
					}}
				>
					<Typography variant="body">Delete</Typography>
				</MenuItem>
				<MenuItem
					onClick={handleClose}
					sx={{
						py: '8px',
						'&:hover': {
							backgroundColor: 'unset',
						},
					}}
				>
					<Typography variant="body">Version History</Typography>
				</MenuItem>
				<MenuItem
					onClick={handleClose}
					sx={{
						py: '8px',
						'&:hover': {
							backgroundColor: 'unset',
						},
					}}
				>
					<Typography variant="body">Information</Typography>
				</MenuItem>
			</Menu>
			<CardContent sx={{ padding: '32px 0 0 0 !important' }}>
				<Box sx={{ display: 'flex', gap: 1, opacity: 0.7 }}>
					{item.hashtag?.length &&
						item.hashtag.map((hashtag) => (
							<Box key={hashtag} sx={{ display: 'inline-flex' }}>
								<Typography variant="body">
									#{hashtag}
								</Typography>
							</Box>
						))}
				</Box>
				<Box>
					<Typography
						variant="sub_title"
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '2',
							WebkitBoxOrient: 'vertical',
						}}
					>
						{item.name}
						<Box
							component="img"
							src={NextIcon}
							alt=""
							sx={{ pl: '10px' }}
						/>
					</Typography>
				</Box>
				{item.status && (
					<Box sx={{ textTransform: 'capitalize', pt: '32px' }}>
						<Typography
							variant="body_bold"
							sx={{
								color:
									item.status === ISCStatus.DEPLOY
										? 'colors.green.50'
										: 'colors.purple.100',
							}}
						>
							{item.status}
						</Typography>
					</Box>
				)}

				{item.updateTime && (
					<Box sx={{ pt: '8px' }}>
						<Typography variant="button_S" sx={{ pr: '4px' }}>
							Changed at
						</Typography>
						<Typography variant="button_S">
							{item.updateTime}
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default SCItem;
