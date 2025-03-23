import { Typography } from '@mui/material';
import Image from 'next/image';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

const Todo = () => {
  return (
    <CenterAlign flexDirection='column' gap={0.5}>
      <Image
        src='/coming_soon.svg'
        height='500'
        width='500'
        alt='coming soon'
      />
      <Typography variant='h2'>Coming soon...</Typography>
    </CenterAlign>
  );
};

export default Todo;
