import React, { useCallback } from "react";


import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { isSet } from "@src/utils";

import Flexbox from "@src/components/common/Flexbox";

export const Amount: React.FC<{
  value: number;
  onChange: (value: number) => void;
  className?: string;
  maximum?: number;
  minimum?: number;
  unit?: string;
}> = ({ value, onChange, className, maximum = 99, minimum = 1, unit }) => {
  const onIncrease = useCallback(() => {
    if (value >= maximum) return;
    onChange(value + 1);
  }, [value, onChange, maximum]);

  const onDecrease = useCallback(() => {
    if (value <= minimum) return;
    onChange(value - 1);
  }, [value, onChange, minimum]);

  return (
    <Flexbox
      align={"center"}
      justify={"between"}
      className={classNames(className, "bg-white rounded")}
    >
      <Flexbox
        as={"button"}
        type={"button"}
        onClick={onDecrease}
        align={"center"}
        justify={"center"}
        className={"w-12 h-12 disabled:text-grey-4"}
        disabled={value <= minimum}
      >
        <FontAwesomeIcon icon={faMinus} className={"w-2"} />
      </Flexbox>
      <div className={"flex-1 text-fz5 text-center truncate"}>
        {value}
        {isSet(unit) && <React.Fragment> {unit}</React.Fragment>}
      </div>
      <Flexbox
        as={"button"}
        type={"button"}
        onClick={onIncrease}
        align={"center"}
        justify={"center"}
        className={"w-12 h-12 disabled:text-grey-4"}
        disabled={maximum <= value}
      >
        <FontAwesomeIcon icon={faPlus} className={"w-2"} />
      </Flexbox>
    </Flexbox>
  );
};
