import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

const useDebounceInput = (delay = 500) => {
  const [inputVal, setInputVal] = useState('');
  const [searchText, setSearchText] = useState('');

  const debouncedSetSearchText = useMemo(
    () => debounce((text: string) => setSearchText(text), delay),
    [delay]
  );

  useEffect(() => {
    debouncedSetSearchText(inputVal);
  }, [debouncedSetSearchText, inputVal]);

  return { inputVal, setInputVal, searchText };
};

export default useDebounceInput;
