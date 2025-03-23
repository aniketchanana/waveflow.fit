'use client';
import { Box, styled } from '@mui/material';

const HStack = styled(Box)<{
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}>(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
}));

export default HStack;
