import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import classNames from "classnames";

import { isBrowser } from "@src/utils";

import Flexbox from "@src/components/common/Flexbox";
import Portal from "@src/components/common/Portal";

interface Props extends Omit<ElementProps<"div">, "onTransitionEnd"> {
  zIndex?: number;
  show: boolean;
  lazyMode?: boolean;
  onBackDrop?: React.MouseEventHandler<HTMLDivElement>;
  onTransitionEnd?: (
    event: React.TransitionEvent<HTMLDivElement>,
    innerShow: boolean,
  ) => void;
}

const Modal: React.FC<PropsWithChildren<Props>> = ({
  children,
  zIndex = 100,
  className,
  show,
  onBackDrop,
  onTransitionEnd: _onTransitionEnd,
  lazyMode,
  ...props
}) => {
  const [innerShow, setInnerShow] = useState<boolean>(false);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (!show) return;

    const id = requestAnimationFrame(() => setInnerShow(true));

    return () => cancelAnimationFrame(id);
  }, [show]);

  const settingWindow = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    settingWindow();
    window.addEventListener("resize", settingWindow);
    window.addEventListener("orientationchange", settingWindow);

    return () => {
      window.removeEventListener("resize", settingWindow);
      window.removeEventListener("orientationchange", settingWindow);
    };
  }, []);

  const onTransitionEnd = useCallback<
    NonNullable<ElementProps<"div">["onTransitionEnd"]>
  >(
    (event) => {
      _onTransitionEnd?.(event, innerShow);
      if (show) return;
      setInnerShow(false);
    },
    [show, innerShow],
  );

  if (!lazyMode && (!isBrowser() || (!innerShow && !show))) return null;

  return (
    <Portal>
      <Flexbox
        id={"modal-wrapper"}
        className={classNames(
          "min-h-full h-stretch",
          "transition-opacity duration-500",
          "bg-black bg-opacity-[64%]",
          {
            "opacity-100": innerShow && show,
            "opacity-0": !show || !innerShow,
            "hidden invisible": !show && !innerShow && lazyMode,
          },
        )}
        style={{
          width,
          height: "stretch",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex,
        }}
        onTransitionEnd={onTransitionEnd}
        onClick={onBackDrop}
        {...props}
      >
        <div className={classNames("flex-1 bg-white z-[999]")} />
        <Flexbox
          align={"center"}
          justify={"center"}
          direction={"column"}
          id={"modal"}
          className={classNames(className, "relative", "w-full", "z-50")}
        >
          {children}
        </Flexbox>
        <div className={classNames("flex-1 bg-white z-[999]")} />
      </Flexbox>
    </Portal>
  );
};

export default Modal;
