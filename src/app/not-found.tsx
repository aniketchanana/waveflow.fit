import { Home } from '@mui/icons-material';
import { Button } from '@mui/material';
import Link from 'next/link';

import { ROUTE_URLS } from '@/common/appUrls';
import CenterAlign from '@/components/StyledComponents/CenterAlign';
import NoResultFound from '@/components/StyledComponents/NoResultFound';
import VStack from '@/components/StyledComponents/VStack';

export default function NotFound() {
  return (
    <CenterAlign>
      <VStack justifyContent='center' alignItems='center' gap={1}>
        <NoResultFound
          imageProps={{ height: 200, width: 200 }}
          text='Page not found'
          textProps={{ fontStyle: 'normal' }}
        />
        <Button
          component={Link}
          href={ROUTE_URLS.dashboard}
          startIcon={<Home />}
        >
          Return Home
        </Button>
      </VStack>
    </CenterAlign>
  );
}
