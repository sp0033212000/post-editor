import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

export const useLayoutSettle = function () {
  const [isLayoutSettle, setIsLayoutSettle] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    setIsLayoutSettle(true);
  }, []);

  return isLayoutSettle;
};
