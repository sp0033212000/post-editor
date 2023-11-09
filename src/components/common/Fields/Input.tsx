import React, { forwardRef, useCallback, useRef } from "react";

import classNames from "classnames";

import { isNotSet, isSet } from "@src/utils";

import Flexbox from "@src/components/common/Flexbox";

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  (
    | (ElementProps<"input"> & { type?: undefined | "input" })
    | (ElementProps<"textarea"> & { type: "textarea" })
  ) & {
    leftSlot?: React.ReactElement;
    rightSlot?: React.ReactElement;
    inputWrapperClassname?: string;
    outerWrapperClassname?: string;
    error?: unknown;
    withBorder?: boolean;
    disabledPadding?: boolean;
    digitOnly?: boolean;
    serializer?: (value: string) => string;
  }
>(
  (
    {
      className,
      inputWrapperClassname,
      outerWrapperClassname,
      leftSlot,
      rightSlot,
      error,
      withBorder,
      disabledPadding,
      digitOnly,
      onChange,
      serializer,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const basicClass = useRef(
      classNames("w-full", {
        "p-2": !disabledPadding,
      }),
    );

    const onInnerChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (serializer) {
          event.target.value = serializer(event.target.value);
        } else if (digitOnly) {
          event.target.value = event.target.value.replace(/\D/g, "");
        }
        if (isSet(maxLength)) {
          event.target.value = event.target.value.slice(0, maxLength);
        }
        // @ts-ignore
        onChange?.(event);
      },
      [digitOnly, maxLength],
    );

    return (
      <Flexbox
        align={"center"}
        className={classNames(
          "rounded-[0.25rem] bg-white overflow-hidden",
          "text-fz-8-mobile text-grey-1 placeholder:text-grey-3",
          {
            "border border-solid border-red": isSet(error),
            "border border-solid border-grey-4": withBorder && isNotSet(error),
          },
          outerWrapperClassname,
        )}
      >
        {leftSlot}
        <div className={classNames("flex-1", inputWrapperClassname)}>
          {props.type === "textarea" ? (
            <textarea
              ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
              {...props}
              onChange={onInnerChange}
              className={classNames(basicClass.current, className)}
            />
          ) : (
            <input
              ref={ref as React.ForwardedRef<HTMLInputElement>}
              {...props}
              onChange={onInnerChange}
              className={classNames(basicClass.current, className)}
            />
          )}
        </div>
        {rightSlot}
      </Flexbox>
    );
  },
);
