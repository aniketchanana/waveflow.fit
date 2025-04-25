import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members',
  description: 'Members manager',
};

const MembersLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default MembersLayout;
