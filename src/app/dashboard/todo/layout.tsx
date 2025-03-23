import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Todo',
  description: 'Task manager',
};

const TodoLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    children
  );
};

export default TodoLayout;
