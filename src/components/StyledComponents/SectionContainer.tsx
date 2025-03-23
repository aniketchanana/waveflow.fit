'use client';
import { Paper, styled } from '@mui/material';

const SectionContainer = styled(Paper)(({ theme }) => {
  return {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0.5rem 0.75rem',
    gap: '0.5rem',
  };
});

export default SectionContainer;
