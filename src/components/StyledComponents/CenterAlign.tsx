'use client';
import { Box, styled } from '@mui/material';

const CenterAlign = styled(Box)<{
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}>(
  ({
    justifyContent = 'center',
    flexDirection = 'row',
    alignItems = 'center',
  }) => ({
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    width: '100%',
    height: '100%',
  })
);

export default CenterAlign;
