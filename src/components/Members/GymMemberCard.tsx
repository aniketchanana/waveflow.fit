import { ArrowRight, Email, Phone } from '@mui/icons-material';
import { Box, CardActions, Chip, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { format } from 'date-fns';

import { STANDARD_DATE_FORMAT } from '@/common/constants';
import DeleteGymCenterMemberRenderer from '@/components/DataGrid/CellRenderers/DeleteGymCenterMemberRenderer';
import EditGymCenterMemberRenderer from '@/components/DataGrid/CellRenderers/EditGymCenterMemberRenderer';
import HStack from '@/components/StyledComponents/HStack';
import MaxCharTypography from '@/components/StyledComponents/MaxCharTypography';
import VStack from '@/components/StyledComponents/VStack';

export type TMembersData = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  start_date: Date;
  end_date: Date;
};

const GymMemberCard = ({
  id,
  name,
  address,
  start_date,
  end_date,
  email,
  phone_number,
}: TMembersData) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <VStack justifyContent='space-between' sx={{ height: '100%' }}>
        <CardContent>
          <HStack
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Box width='50%'>
              <MaxCharTypography maxchars={16} variant='h6'>
                {name}
              </MaxCharTypography>
            </Box>
            <HStack sx={{ width: '50%' }} justifyContent='flex-end'>
              <EditGymCenterMemberRenderer id={id} />
              <DeleteGymCenterMemberRenderer id={id} />
            </HStack>
          </HStack>
          <MaxCharTypography gutterBottom variant='body1' maxchars={40}>
            Address: {address}
          </MaxCharTypography>
          <HStack gap={0.2} alignItems='center'>
            <Chip
              size='small'
              variant='outlined'
              label={format(start_date, STANDARD_DATE_FORMAT)}
            />
            <ArrowRight sx={{ fontSize: '1px' }} />
            <Chip
              size='small'
              variant='outlined'
              label={format(end_date, STANDARD_DATE_FORMAT)}
            />
          </HStack>
        </CardContent>
        <CardActions>
          <IconButton href={`mailto:${email}`}>
            <Email />
          </IconButton>
          <IconButton href={`tel:${phone_number}`}>
            <Phone />
          </IconButton>
        </CardActions>
      </VStack>
    </Card>
  );
};

export default GymMemberCard;
