import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import { EExerciseLoggingType } from '@/common/constants';
import HStack from '@/components/StyledComponents/HStack';
import VStack from '@/components/StyledComponents/VStack';
import { TItem } from '@/components/TemplateCreator/ItemList';
import SuggestedIntensity from '@/components/TemplateCreator/Workout/SuggestedIntensity';
import { getExerciseId } from '@/components/TemplateCreator/Workout/WorkoutCreator';

export type TSuggestedIntensity =
  | { reps: number; weight: number; countPerRep: number }
  | { weight: number; time: number }
  | { time: number };
export type TWorkoutExercise = {
  id: string;
  exerciseName: string;
  exerciseLogType: EExerciseLoggingType;
  suggestedIntensity?: TSuggestedIntensity;
  isOptional?: boolean;
  alternateExercise?: Record<string, TWorkoutExercise>;
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const ExerciseLoggingType = [
  {
    label: 'Yes / No based',
    value: EExerciseLoggingType.BOOLEAN,
  },
  {
    label: 'Rep based',
    value: EExerciseLoggingType.WEIGHT_REP_COUNT,
  },
  {
    label: 'Time and weight based',
    value: EExerciseLoggingType.TIME_WEIGHT,
  },
  {
    label: 'Time based',
    value: EExerciseLoggingType.TIME,
  },
];

const ExerciseItem = ({
  itemProps,
  handleDelete,
  isParent = true,
  prefix = '',
}: TItem<TWorkoutExercise>) => {
  const [loggingType, setLoggingType] = useState(itemProps.exerciseLogType);
  const [altExercise, setAltExercise] = useState<string[]>(
    itemProps.alternateExercise ? Object.keys(itemProps.alternateExercise) : []
  );
  return (
    <VStack gap={0.75} height='fit-content !important'>
      <HStack gap={0.5}>
        <TextField
          placeholder='ex: Leg press'
          name={`${prefix}${itemProps.id}.exerciseName`}
          required
          sx={{ width: '8rem' }}
          defaultValue={itemProps.exerciseName}
        />
        <FormControl>
          <InputLabel id='exercise-logging-type-selector'>
            Logging type
          </InputLabel>
          <Select
            sx={{ width: { xs: '8.5rem', sm: '12.5rem' } }}
            label='Logging type'
            name={`${prefix}${itemProps.id}.exerciseLogType`}
            defaultValue={itemProps.exerciseLogType}
            input={<OutlinedInput label='Logging type' />}
            MenuProps={MenuProps}
            size='small'
            onChange={(e) =>
              setLoggingType(e.target.value as EExerciseLoggingType)
            }
          >
            {ExerciseLoggingType.map((e) => {
              return (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          name={`${prefix}${itemProps.id}.isOptional`}
          control={<Checkbox defaultChecked={itemProps.isOptional} />}
          label='Optional'
        />
        {handleDelete && (
          <IconButton onClick={() => handleDelete?.(itemProps?.id)}>
            <Delete />
          </IconButton>
        )}
      </HStack>
      <SuggestedIntensity
        loggingType={loggingType}
        exerciseId={itemProps.id}
        defaultValue={itemProps.suggestedIntensity}
        prefix={prefix}
      />
      {altExercise.map((e) => {
        return (
          <Box key={e} component='span'>
            <Divider sx={{ my: 1 }}>Or</Divider>
            <VStack gap={0.5}>
              <ExerciseItem
                key={e}
                itemProps={
                  itemProps.alternateExercise?.[e] || {
                    id: e,
                    exerciseName: '',
                    exerciseLogType: EExerciseLoggingType.BOOLEAN,
                  }
                }
                isParent={false}
                handleDelete={(deleteId: string) => {
                  setAltExercise((p) => p.filter((id) => id !== deleteId));
                }}
                prefix={`${itemProps.id}.alternateExercise.`}
              />
            </VStack>
          </Box>
        );
      })}
      <TextField
        name={`${prefix}${itemProps.id}.id`}
        defaultValue={itemProps.id}
        sx={{ display: 'none' }}
      />
      {isParent && (
        <Button
          variant='text'
          startIcon={<Add />}
          sx={{ mt: 0.5 }}
          onClick={() => setAltExercise((p) => [...p, getExerciseId()])}
        >
          Add alternate
        </Button>
      )}
    </VStack>
  );
};

export default ExerciseItem;
