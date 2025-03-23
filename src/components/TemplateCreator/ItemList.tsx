import { Add } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import { JSX, useState } from 'react';

import VStack from '@/components/StyledComponents/VStack';

export type TItem<T> = {
  itemProps: T;
  handleDelete?: (id: string) => void;
  isParent?: boolean;
  prefix?: string;
};

const ItemList = <T extends { id: string }>({
  defaultItems,
  getBaseItem,
  addNewBtnText,
  item: Item,
}: {
  defaultItems: T[];
  getBaseItem: () => T;
  addNewBtnText: string;
  item: (props: TItem<T>) => JSX.Element;
}) => {
  const [exercises, setExercises] = useState<T[]>(
    defaultItems.length > 0 ? defaultItems : [getBaseItem()]
  );
  const addMore = () => {
    setExercises((prev) => {
      return [...prev, getBaseItem()];
    });
  };
  const handleDelete = (itemId: string) => {
    setExercises((prev) => {
      return prev.filter((p) => p.id !== itemId);
    });
  };

  return (
    <>
      <VStack gap={0.5}>
        {exercises.map((e, i) => {
          return (
            <Card key={e.id} sx={{ py: 1.25, px: 0.5, height: 'fit-content' }}>
              <Item
                itemProps={e}
                handleDelete={i !== 0 ? handleDelete : undefined}
              />
            </Card>
          );
        })}
      </VStack>
      <Button variant='text' onClick={addMore} startIcon={<Add />}>
        {addNewBtnText}
      </Button>
    </>
  );
};

export default ItemList;
