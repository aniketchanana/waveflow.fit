import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Workout',
  description: 'Workout manager',
};

const WorkoutLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    children
  );
};

export default WorkoutLayout;
