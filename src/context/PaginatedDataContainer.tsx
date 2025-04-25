import { Box } from '@mui/material';
import { createContext } from 'react';

import SearchByText from '@/components/Search/SearchByText';
import SectionContainer from '@/components/StyledComponents/SectionContainer';

type TDataGridCtx = {
  refetchData: () => void;
};

export const PaginatedData = createContext<TDataGridCtx>({
  refetchData: () => {
    throw new Error('Function not implemented');
  },
});

export const PaginatedDataContainer = ({
  children,
  refetchData,
  searchKey,
  searchPlaceholder,
  inputVal,
  setInputVal,
  actions,
}) => {
  return (
    <PaginatedData value={{ refetchData }}>
      <SectionContainer sx={{ py: 1 }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            position: 'relative',
          }}
        >
          <Box width='100%' justifyContent='space-between' display='flex'>
            {searchKey && (
              <SearchByText
                placeholder={searchPlaceholder}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
                onClearIconClick={() => {
                  setInputVal('');
                }}
              />
            )}
            {typeof actions === 'function' ? actions({ refetchData }) : actions}
          </Box>
          {children}
        </Box>
      </SectionContainer>
    </PaginatedData>
  );
};
