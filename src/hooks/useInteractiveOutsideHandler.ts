import { useCallback, useEffect } from 'react';

import { isNotSet } from '@src/utils';

const useInteractiveOutsideHandler = ({
  element,
  callback,
  excludeElements = [],
  disable,
}: {
  element: HTMLElement | null;
  callback: Function;
  excludeElements?: Array<HTMLElement | null>;
  disable?: boolean;
}) => {
  const clickHandler = useCallback(
    (event: Event) => {
      if (isNotSet(element)) return;
      if (
        element instanceof HTMLElement &&
        event.target instanceof HTMLElement &&
        !element.contains(event.target)
      ) {
        const isExcludedElement = excludeElements.some(
          (excludeElement) =>
            excludeElement instanceof HTMLElement &&
            event.target instanceof HTMLElement &&
            excludeElement.contains(event.target)
        );
        if (!isExcludedElement) {
          callback();
        }
      }
    },
    [callback, element, excludeElements]
  );

  useEffect(() => {
    if (disable) return;
    document.addEventListener('mousedown', clickHandler);
    document.addEventListener('touchstart', clickHandler);

    return () => {
      document.removeEventListener('mousedown', clickHandler);
      document.removeEventListener('touchstart', clickHandler);
    };
  }, [clickHandler, disable]);
};

export default useInteractiveOutsideHandler;
