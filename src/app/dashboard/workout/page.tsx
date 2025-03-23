import TemplateList from '@/components/TemplateCreator/TemplateList';
import WorkoutCreator from '@/components/TemplateCreator/Workout/WorkoutCreator';
import WorkoutTemplateCard from '@/components/TemplateCreator/Workout/WorkoutTemplateCard';

const Workout = () => {
  return (
    <TemplateList
      listName='Workouts'
      creator={WorkoutCreator}
      templateCard={WorkoutTemplateCard}
    />
  );
};

export default Workout;
