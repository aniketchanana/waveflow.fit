import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { ROUTE_URLS } from '@/common/appUrls';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import { TraineeRelationshipCtx } from '@/context/TraineeRelationship';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const TrainerSwitcher = () => {
  const {
    isAssociationsLoading,
    associations,
    associationsById,
    setSelectedAssociationId,
    selectedAssociationId,
  } = useContext(TraineeRelationshipCtx);
  const router = useRouter();
  if (associations.length === 0) return null;
  if (isAssociationsLoading) return <CircularProgress size='30px' />;
  return (
    <SectionContainer
      sx={{
        px: 1,
        py: 0.5,
        height: '60px',
        width: '280px',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id='trainer-selector-label'>Training with</InputLabel>
        <Select
          labelId='trainer-selector-label'
          id='trainer-selector'
          value={selectedAssociationId || ''}
          onChange={(e) => {
            setSelectedAssociationId(e.target.value as string);
            router.push(ROUTE_URLS.dashboard);
          }}
          input={
            <OutlinedInput label='Training with' sx={{ height: '2.75rem' }} />
          }
          MenuProps={MenuProps}
          size='small'
        >
          {associations.map((id) => {
            const association = associationsById[id];
            return (
              <MenuItem key={id} value={id}>
                {association.trainer?.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </SectionContainer>
  );
};

export default TrainerSwitcher;
