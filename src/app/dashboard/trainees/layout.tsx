import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Trainees',
  description: 'Trainees manager',
};

const TraineesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    children
  );
};

export default TraineesLayout;
