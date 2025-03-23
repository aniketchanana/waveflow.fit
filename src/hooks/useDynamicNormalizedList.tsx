import { useCallback, useMemo, useState } from 'react';

interface ListItem {
  id: string;
  [key: string]: any;
}

type ListState<T extends ListItem> = {
  byId: Record<string, T>;
  allIds: string[];
};

export const useDynamicNormalizedList = <T extends ListItem>(
  initialList: T[] = []
) => {
  const [isListLoading, setIsListLoading] = useState(true);
  const transformList = useCallback((list: T[]): ListState<T> => {
    const byId = list.reduce<Record<string, T>>((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    return { byId, allIds: list.map((item) => item.id) };
  }, []);

  const [state, setState] = useState<ListState<T>>(transformList(initialList));

  const addItem = useCallback((item: T) => {
    setState((prev) => ({
      byId: { ...prev.byId, [item.id]: item },
      allIds: prev.allIds.includes(item.id)
        ? prev.allIds
        : [...prev.allIds, item.id],
    }));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      byId: { ...prev.byId, [id]: { ...prev.byId[id], ...updates } },
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setState((prev) => {
      const { [id]: _, ...newById } = prev.byId;
      return {
        byId: newById,
        allIds: prev.allIds.filter((existingId) => existingId !== id),
      };
    });
  }, []);

  const setList = useCallback(
    (newList: T[]) => {
      setState(transformList(newList));
    },
    [transformList]
  );
  const memoisedState = useMemo(
    () => ({
      byId: state.byId,
      allIds: state.allIds,
      addItem,
      updateItem,
      removeItem,
      setList,
      isListLoading,
      setIsListLoading,
    }),
    [
      addItem,
      isListLoading,
      removeItem,
      setList,
      state.allIds,
      state.byId,
      updateItem,
    ]
  );
  return memoisedState;
};
