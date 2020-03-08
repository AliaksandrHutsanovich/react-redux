import { useRef } from 'react';

const usePrevious = (visible) => {
  const ref = useRef();
  const previous = ref.current;
  if (ref.current !== visible) {
    ref.current = visible;
  }
  return previous;
};

export default usePrevious;
