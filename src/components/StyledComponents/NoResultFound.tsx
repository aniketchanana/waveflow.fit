'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

const NoResultFound = ({
  text = '',
  imageProps = {},
  textProps = {},
}: Partial<{
  text: string;
  imageProps: Record<string, string>;
  textProps: Record<string, string>;
}>) => {
  return (
    <CenterAlign flexDirection='column' gap={1}>
      <Image
        alt='no results'
        src='/no_results.svg'
        width={80}
        height={80}
        {...imageProps}
      />
      {text && (
        <Typography
          variant='h6'
          textAlign='center'
          width='100%'
          color='textSecondary'
          fontStyle='italic'
          {...textProps}
        >
          {text}
        </Typography>
      )}
    </CenterAlign>
  );
};

export default NoResultFound;
