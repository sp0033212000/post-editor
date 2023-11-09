import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Control, FieldPath, useController } from "react-hook-form";

import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

import {
  isEmptyString,
  isNotEmptyArray,
  isNotEmptyString,
  isNotSet,
  isSet,
  isString,
} from "@src/utils";

import useInteractiveOutsideHandler from "@src/hooks/useInteractiveOutsideHandler";

import ConditionalFragment from "@src/components/common/ConditionalFragment";
import Flexbox from "@src/components/common/Flexbox";

import TailingModal from "@src/components/feature/TailingModal";

export interface RenderDisplayProps {
  displayValue: string | undefined | null | React.ReactElement;
  hasSelected: boolean;
  selectedKeys?: Array<string | number>;
}

interface SelectComponent extends CustomizeFunctionComponent {
  <TFormValues extends FieldValues, Name extends FieldPath<TFormValues>>(
    props: PropsWithChildren<{
      chevronClassName?: string;
      className?: string;
      options: Array<
        Option<TFormValues[Name]> & { leftSlot?: React.ReactElement }
      >;
      control: Control<TFormValues>;
      name: Name;
      placeholder?: string;
      rules?: Omit<
        RegisterOptions<TFormValues, Name>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >;
      isMultiple?: boolean;
      renderDisplay?: React.FC<RenderDisplayProps>;
      disableBolder?: boolean;
      disablePadding?: boolean;
      wrapperRef?: HTMLDivElement | null;
    }>,
    context?: any,
  ): React.ReactElement | null;
}

export const Select: SelectComponent = ({
  className,
  chevronClassName,
  name,
  control,
  placeholder,
  options,
  rules,
  isMultiple = false,
  renderDisplay,
  disableBolder,
  disablePadding,
  wrapperRef: specificWrapperRef = null,
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement | null>(specificWrapperRef);
  const optionRef = useRef<HTMLDivElement | null>(null);

  const {
    field: { value, onChange },
  } = useController({ control, name, rules });

  const toggleOptions = useCallback(() => {
    setIsOptionOpen((prev) => !prev);
  }, []);

  useInteractiveOutsideHandler({
    element: optionRef.current,
    callback: () => setIsOptionOpen(false),
    excludeElements: [wrapperRef.current],
  });

  const onItemClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      const key = event.currentTarget.dataset.key;
      if (!key) return;

      if (isMultiple) {
        let result = (value ?? []) as Array<string | number>;
        onChange(
          result.includes(key)
            ? result.filter((existKey) => existKey !== key)
            : result.concat(key),
        );
      } else {
        onChange(key);
        toggleOptions();
      }
    },
    [isMultiple, value],
  );

  const displayValue = useMemo(() => {
    if (!isMultiple) {
      const option = options.find((option) => option.key === value);
      return (
        <React.Fragment>
          {option?.leftSlot}
          {option?.label ?? placeholder}
        </React.Fragment>
      );
    } else {
      const result = options
        .filter(({ key }) =>
          ((value as Array<string | number>) ?? []).includes(key),
        )
        ?.map(({ label }) => label)
        .join("、");
      return isEmptyString(result) ? placeholder : result;
    }
    // eslint-disable-next-line
  }, [value, isMultiple, options]);

  const bindRef = useCallback(
    (ref: HTMLDivElement) => {
      if (specificWrapperRef) return (wrapperRef.current = specificWrapperRef);
      else return (wrapperRef.current = ref);
    },
    [specificWrapperRef],
  );

  return (
    <React.Fragment>
      <TailingModal
        isOpen={isOptionOpen}
        wrapperRef={wrapperRef}
        customRef={optionRef}
        fitWrapperWidth
        className={"overflow-scroll bg-white"}
      >
        {options.map(({ label, key, leftSlot }) => (
          <Flexbox
            key={key}
            align={"center"}
            className={classNames(
              "px-4 h-12 text-fz5",
              "hoverable:hover:bg-primary-light active:bg-primary-light",
              "cursor-pointer",
              {
                "bg-primary-light": isMultiple
                  ? (value as Array<string | number>)?.includes(key)
                  : value === key,
              },
            )}
            onClick={onItemClick}
            data-key={key}
          >
            {leftSlot}
            {label}
          </Flexbox>
        ))}
      </TailingModal>
      <Flexbox
        ref={bindRef}
        align={"center"}
        justify={"between"}
        onClick={toggleOptions}
        className={classNames(
          className,
          "relative",
          "w-full",
          "text-fz-8-mobile text-grey-2",
          "bg-white",
          "hover:cursor-pointer",
          { "p-2": !disablePadding },
          { rounded: !disableBolder },
        )}
      >
        <ConditionalFragment condition={!renderDisplay}>
          <Flexbox
            align={"center"}
            className={classNames("mr-2", "text-base flex-1 truncate", {
              "text-grey-2": isNotSet(value) || isEmptyString(value),
            })}
          >
            {displayValue || placeholder}
          </Flexbox>
        </ConditionalFragment>
        <ConditionalFragment condition={isSet(renderDisplay)}>
          {renderDisplay &&
            React.createElement(renderDisplay, {
              displayValue: displayValue || placeholder,
              hasSelected:
                isSet(value) &&
                ((isString(value) && isNotEmptyString(value)) ||
                  (Array.isArray(value) && isNotEmptyArray(value))),
              selectedKeys: isMultiple
                ? (value as Array<string | number>)
                : [value],
            })}
        </ConditionalFragment>
        <span className={classNames(chevronClassName)}>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={classNames("transform transition-transform", {
              "rotate-180": isOptionOpen,
            })}
          />
        </span>
      </Flexbox>
    </React.Fragment>
  );
};
