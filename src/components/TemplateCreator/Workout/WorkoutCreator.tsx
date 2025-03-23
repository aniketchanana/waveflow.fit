'use client';

import { v4 } from 'uuid';

import { EExerciseLoggingType } from '@/common/constants';
import Creator from '@/components/TemplateCreator/Creator';
import ItemList from '@/components/TemplateCreator/ItemList';
import ExerciseItem, {
  TWorkoutExercise,
} from '@/components/TemplateCreator/Workout/ExerciseItem';

export type TWorkoutPlan = {
  workoutName: string;
  workoutExercises: TWorkoutExercise[];
};

export const getExerciseId = () => `exercises-${v4()}`;

const getBaseExercise = () => ({
  id: getExerciseId(),
  exerciseName: '',
  exerciseLogType: EExerciseLoggingType.WEIGHT_REP_COUNT,
});

const ExerciseList = ({
  defaultItems,
}: {
  defaultItems: TWorkoutExercise[];
}) => {
  return (
    <ItemList<TWorkoutExercise>
      addNewBtnText='Add new exercise'
      defaultItems={defaultItems}
      getBaseItem={getBaseExercise}
      item={ExerciseItem}
    />
  );
};

const WorkoutCreator = () => {
  return (
    <Creator<TWorkoutPlan, TWorkoutExercise>
      initState={{
        workoutName: '',
        workoutExercises: [],
      }}
      groupPrefix='workoutExercises'
      createNewBtnText='Create new workout'
      drawerHeader='Create workout'
      planNameKey='workoutName'
      list={ExerciseList}
    />
  );
};

export default WorkoutCreator;
