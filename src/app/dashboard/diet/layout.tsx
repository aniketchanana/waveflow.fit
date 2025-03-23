import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diet',
  description: 'Diet manager',
};

const DietLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    children
  );
};

export default DietLayout;
