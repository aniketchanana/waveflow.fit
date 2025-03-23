'use client';
import { Box, styled } from '@mui/material';

const VStack = styled(Box)<{
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
  flexDirection: 'column',
  height: 'fit-content',
}));

export default VStack;
