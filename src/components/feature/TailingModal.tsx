import React, {
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import classNames from "classnames";
import { isBrowser } from "react-use/lib/misc/util";

import { isNotSet, refMerge } from "@src/utils";

import { useLayoutSettle } from "@src/hooks/useLayoutSettle";

interface Props {
  isOpen: boolean;
  fitWrapperWidth?: boolean;
  wrapperRef: MutableRefObject<HTMLElement | null>;
  customRef?: MutableRefObject<HTMLDivElement | null>;
  id?: string;
  style?: ElementProps<"div">["style"];
  className?: ElementProps<"div">["className"];
  offset?: number;
}

const TailingModal: React.FC<PropsWithChildren<Props>> = function ({
  children,
  wrapperRef,
  customRef,
  isOpen,
  fitWrapperWidth,
  id,
  style,
  className,
  offset = 8,
}) {
  const [recalculateTop, setRecalculateTop] = useState<number>(0);
  const [isTransitionEnd, setIsTransitionEnd] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;

    const triggerRecalculateTop = () => setRecalculateTop((prev) => prev + 1);
    window.addEventListener("scroll", triggerRecalculateTop);
    setIsTransitionEnd(false);
    if (window.ontouchmove) {
      window.addEventListener("touchmove", triggerRecalculateTop);
    }

    return () => {
      window.removeEventListener("scroll", triggerRecalculateTop);

      if (window.ontouchmove) {
        window.removeEventListener("touchmove", triggerRecalculateTop);
      }
    };
  }, [isOpen]);

  const isLayoutSettle = useLayoutSettle();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const left = useMemo(() => {
    if (isNotSet(wrapperRef.current)) return 0;

    return wrapperRef.current.getBoundingClientRect().left;
    // eslint-disable-next-line
  }, [wrapperRef, isLayoutSettle]);

  const position = useMemo(() => {
    if (!wrapperRef.current || !modalRef.current) return { maxHeight: 0 };

    const OFFSET = offset;
    const windowHeight = window.innerHeight;
    const wrapperBounding = wrapperRef.current.getBoundingClientRect();
    const wrapperTop = wrapperBounding.top;
    const wrapperHeight = wrapperBounding.height;

    const modalHeight = Math.max(
      modalRef.current.clientHeight,
      wrapperRef.current?.scrollHeight,
    );

    const downPosition = OFFSET + wrapperTop + wrapperHeight;

    const isOverflow = modalHeight + downPosition > windowHeight;

    if (isOverflow) {
      const bottom = windowHeight - wrapperTop + offset;
      return { bottom, maxHeight: isOpen ? windowHeight - bottom - 24 : 0 };
    }
    return {
      top: downPosition,
      maxHeight: isOpen ? windowHeight - downPosition - 24 : 0,
    };
    // eslint-disable-next-line
  }, [isOpen, recalculateTop, isTransitionEnd]);

  return (
    <div
      id={id}
      key={isBrowser.toString()}
      ref={refMerge(modalRef, customRef)}
      className={classNames(
        "fixed",
        "overflow-hidden",
        "transition-[max-height] duration-500",
        "rounded-lg",
        "bg-bg-dark shadow-[0px_8px_32px_rgba(0,0,0,0.12)]",
        "z-50",
        className,
      )}
      onTransitionEnd={() => setIsTransitionEnd(true)}
      style={{
        width:
          fitWrapperWidth && isBrowser
            ? wrapperRef.current?.clientWidth
            : undefined,
        left,
        ...position,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default TailingModal;
