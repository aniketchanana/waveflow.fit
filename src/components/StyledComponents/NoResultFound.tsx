'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

const NoResultFound = ({
  text = '',
  imageProps = {},
  textProps = {},
  actionBtn = null,
}: Partial<{
  text: string;
  imageProps: Record<string, string | number>;
  textProps: Record<string, string>;
  actionBtn?: React.ReactNode;
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
      {actionBtn}
    </CenterAlign>
  );
};

export default NoResultFound;
