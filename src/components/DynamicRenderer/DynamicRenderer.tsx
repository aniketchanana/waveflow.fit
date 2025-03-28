'use client';
import { Box, CircularProgress } from '@mui/material';

import CenterAlign from '@/components/StyledComponents/CenterAlign';
import ErrorComponent from '@/components/StyledComponents/ErrorComponent';
import NoResultFound from '@/components/StyledComponents/NoResultFound';

const DynamicRenderer = ({
  children,
  isLoading,
  isError = false,
  isNoResultFound = false,
  height = '100%',
}: {
  children: React.ReactNode;
  isLoading: boolean;
  isError?: boolean;
  isNoResultFound?: boolean;
  height?: string;
}) => {
  let component: React.ReactNode | null = null;
  if (isLoading) {
    component = (
      <CenterAlign>
        <CircularProgress />
      </CenterAlign>
    );
  }

  if (isError) {
    component = (
      <ErrorComponent
        imageProps={{ height: '150', width: '150' }}
        text='Something went wrong, Unable to get data'
      />
    );
  }

  if (isNoResultFound) {
    component = (
      <NoResultFound
        imageProps={{ height: '150', width: '150' }}
        text='No result found'
      />
    );
  }
  if (component) {
    return <Box height={height}>{component}</Box>;
  }
  return children;
};

export default DynamicRenderer;
