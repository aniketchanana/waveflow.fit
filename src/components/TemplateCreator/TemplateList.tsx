import { Grid2 as Grid, Typography } from '@mui/material';
import { JSX } from 'react';

import HStack from '@/components/StyledComponents/HStack';
import SectionContainer from '@/components/StyledComponents/SectionContainer';

type Props = {
  listName: string;
  creator: () => JSX.Element;
  templateCard: () => JSX.Element;
};

const TemplateList = ({
  listName,
  creator: Creator,
  templateCard: TemplateCard,
}: Props) => {
  return (
    <SectionContainer sx={{ py: 1 }}>
      <HStack justifyContent='space-between' pb={0.5}>
        <Typography variant='h3'>{listName}</Typography>
        <Creator />
      </HStack>
      <Grid
        container
        spacing={1}
        sx={{ overflowY: 'auto', height: '92%', mx: '-0.75rem', px: '0.75rem' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((e) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={e}>
            <TemplateCard />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default TemplateList;
