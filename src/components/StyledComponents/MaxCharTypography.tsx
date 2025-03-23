'use client';
import { styled, Typography } from '@mui/material';

const MaxCharTypography = styled(Typography)<{ maxchars: number }>(({
  maxchars,
}) => {
  return {
    width: `${maxchars}ch`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
});

export default MaxCharTypography;
