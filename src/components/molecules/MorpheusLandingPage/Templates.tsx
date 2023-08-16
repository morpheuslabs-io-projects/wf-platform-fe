import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ISCItem } from '@/types/sc.type';
import SCItem from '@/components/atoms/SCItem';
import Setting from '@/assets/icons/setting.svg';
import TemplateIcon from '@/assets/icons/template.svg';

const TemplatesComponent: FC = () => {
	const samples: ISCItem[] = [
		{
			name: 'NFT Drop v.1.0.3',
			icon: TemplateIcon,
			// status: ISCStatus.DEPLOY,
			// updateTime: '2023/08/08 20:03',
		},
		{
			name: 'NFT Drop v.1.0.3',
			icon: TemplateIcon,
			// status: ISCStatus.IN_PROGRESS,
			// updateTime: '2023/08/08 20:03',
		},
		{
			name: 'NFT Drop v.1.0.3',
			icon: TemplateIcon,
		},
		{
			name: 'NFT Drop v.1.0.3',
			icon: TemplateIcon,
		},
		{
			name: 'NFT Drop v.1.0.3',
			icon: TemplateIcon,
		},
		{
			name: 'NFT Drop v.1.0.3',
			icon: TemplateIcon,
		},
	];
	return (
		<Box sx={{ px: '8%', pt: '120px', pb: '80px' }}>
			<Stack
				spacing={{ xs: 2 }}
				direction="row"
				useFlexGap
				flexWrap="wrap"
				sx={{ alignItems: 'end', pb: '32px' }}
			>
				<img src={Setting} alt="setting" />
				<Typography variant="header_3">Templates</Typography>
			</Stack>
			<Grid container spacing={2}>
				{samples.map((sample) => {
					return (
						<Grid item xs={12} sm={6} md={4} key={sample.name}>
							<SCItem item={sample} isEdit={false} />
						</Grid>
					);
				})}
			</Grid>
			<Button variant="fill_small" sx={{ mt: '32px' }}>
				More
			</Button>
		</Box>
	);
};

export default TemplatesComponent;
