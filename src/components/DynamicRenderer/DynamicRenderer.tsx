'use client';
import { CircularProgress } from '@mui/material';

import CenterAlign from '@/components/StyledComponents/CenterAlign';
import ErrorComponent from '@/components/StyledComponents/ErrorComponent';
import NoResultFound from '@/components/StyledComponents/NoResultFound';

const DynamicRenderer = ({
  children,
  isLoading,
  isError = false,
  isNoResultFound = false,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  isError?: boolean;
  isNoResultFound?: boolean;
}) => {
  if (isLoading) {
    return (
      <CenterAlign>
        <CircularProgress />
      </CenterAlign>
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        imageProps={{ height: '150', width: '150' }}
        text='Something went wrong, Unable to get data'
      />
    );
  }

  if (isNoResultFound) {
    return (
      <NoResultFound
        imageProps={{ height: '150', width: '150' }}
        text='No result found'
      />
    );
  }
  return children;
};

export default DynamicRenderer;
