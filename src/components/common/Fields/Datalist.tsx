import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Control, FieldPath, useController } from "react-hook-form";

import { faChevronDown, faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

import {
  isEmptyArray,
  isEmptyString,
  isNotEmptyArray,
  isNotEmptyString,
  isNotSet,
  isSet,
  isString,
} from "@src/utils";

import useChangeEvent from "@src/hooks/useChangeEvent";
import useInteractiveOutsideHandler from "@src/hooks/useInteractiveOutsideHandler";

import ConditionalFragment from "@src/components/common/ConditionalFragment";
import { RenderDisplayProps } from "@src/components/common/Fields/Select";
import Flexbox from "@src/components/common/Flexbox";

import TailingModal from "@src/components/feature/TailingModal";

interface DatalistComponent extends CustomizeFunctionComponent {
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
      renderDisplay?: React.FC<RenderDisplayProps>;
      disableBolder?: boolean;
      disablePadding?: boolean;
      wrapperRef?: HTMLDivElement | null;
      searchHint?: string;
    }>,
    context?: any,
  ): React.ReactElement | null;
}

export const Datalist: DatalistComponent = ({
  className,
  chevronClassName,
  name,
  control,
  placeholder,
  options,
  rules,
  renderDisplay,
  disableBolder,
  disablePadding,
  wrapperRef: specificWrapperRef = null,
  searchHint,
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [keyword, onKeywordChange] = useChangeEvent();

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

      onChange(key);
      toggleOptions();
    },
    [value],
  );

  const displayValue = useMemo(() => {
    const result = options
      .filter(({ key }) =>
        ((value as Array<string | number>) ?? []).includes(key),
      )
      ?.map(({ label }) => label)
      .join("、");
    return isEmptyString(result) ? placeholder : result;
    // eslint-disable-next-line
  }, [value, options]);

  const bindRef = useCallback(
    (ref: HTMLDivElement) => {
      if (specificWrapperRef) return (wrapperRef.current = specificWrapperRef);
      else return (wrapperRef.current = ref);
    },
    [specificWrapperRef],
  );

  const actualOptions = useMemo(() => {
    // keyword should not start or end with space;
    const actualKeyword = keyword.trim();
    // If keyword is empty after trimStart, return all options;
    if (isEmptyString(actualKeyword)) return options;

    // Select the options which label or key contains keyword;
    return options.filter(({ label, key }) => {
      return (
        label.toLocaleLowerCase().includes(actualKeyword.toLocaleLowerCase()) ||
        (isString(key) &&
          key.toLocaleLowerCase().includes(actualKeyword.toLocaleLowerCase()))
      );
    });
  }, [keyword, options]);

  return (
    <React.Fragment>
      <TailingModal
        isOpen={isOptionOpen}
        wrapperRef={wrapperRef}
        customRef={optionRef}
        fitWrapperWidth
        className={"overflow-scroll bg-white"}
      >
        <Flexbox
          align={"center"}
          className={"py-3.5 px-4 border-b border-grey-4"}
        >
          <FontAwesomeIcon icon={faSearch} className={"mr-2 w-3.5 h-3.5"} />
          <div className={"flex-1"}>
            <input
              className={"w-full text-fz5"}
              placeholder={searchHint}
              value={keyword}
              onChange={onKeywordChange}
            />
          </div>
        </Flexbox>
        {isEmptyArray(actualOptions) ? (
          <Flexbox
            align={"center"}
            className={classNames("px-4 h-12 text-fz5", "bg-white")}
            onClick={onItemClick}
          >
            搜尋不到結果。
          </Flexbox>
        ) : (
          <React.Fragment>
            {actualOptions.map(({ label, key, leftSlot }) => (
              <Flexbox
                key={key}
                align={"center"}
                className={classNames(
                  "px-4 h-12 text-fz5",
                  "bg-white hoverable:hover:bg-blue/[.15] active:bg-blue/[.15]",
                  {
                    "bg-blue/[.15]": value === key,
                  },
                )}
                onClick={onItemClick}
                data-key={key}
              >
                {leftSlot}
                {label}
              </Flexbox>
            ))}
          </React.Fragment>
        )}
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
          "text-fz5 text-grey-2",
          "bg-white",
          "hover:cursor-pointer",
          { "p-3.5": !disablePadding },
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
              selectedKeys: value,
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
