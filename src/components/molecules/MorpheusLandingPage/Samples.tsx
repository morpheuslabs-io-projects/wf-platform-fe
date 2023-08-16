import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ISCItem } from '@/types/sc.type';
import SCItem from '@/components/atoms/SCItem';
import TemplateIcon from '@/assets/icons/template.svg';

const SampleComponent: FC = () => {
	const samples: ISCItem[] = [
		{
			name: 'DAO Process Automation',
			icon: TemplateIcon,
		},
		{
			name: 'NFT Marketplace Smart Contract',
			icon: TemplateIcon,
		},
		{
			name: 'NFT Drop Smart Contract',
			icon: TemplateIcon,
		},
		{
			name: 'Yield Farming Smart Contract',
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
				sx={{ pb: '32px', justifyContent: 'center' }}
			>
				<Typography variant="header_3">Sample Solutions</Typography>
			</Stack>
			<Stack
				direction={{ sm: 'column', md: 'row' }}
				spacing={{ xs: 1, sm: 2 }}
			>
				{samples.map((sample) => {
					return (
						<Stack
							key={sample.name}
							sx={{ border: '2px solid rgba(87, 73, 250, 0.40)' }}
						>
							<SCItem item={sample} isEdit={false} />
						</Stack>
					);
				})}
			</Stack>
		</Box>
	);
};

export default SampleComponent;
