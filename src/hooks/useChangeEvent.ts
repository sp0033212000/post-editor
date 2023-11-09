import React, { useCallback, useMemo, useState } from "react";

import { isEmptyString, isNotSet, isTrue } from "@src/utils";

export enum ChangeEventType {
  TEXT = "text",
  FILE = "file",
  NUMBER = "number",
}

type CleanValue = () => void;

type Validator = (value: string) => boolean | string | undefined;

function useChangeEvent(
  type?: ChangeEventType.TEXT,
  validator?: Validator,
): [string, React.ChangeEventHandler<HTMLInputElement>, CleanValue, boolean];
function useChangeEvent(
  type: ChangeEventType.NUMBER,
): [string, React.ChangeEventHandler<HTMLInputElement>, CleanValue];
function useChangeEvent(
  type: ChangeEventType.FILE,
): [FileList | null, React.ChangeEventHandler<HTMLInputElement>, CleanValue];
function useChangeEvent(type?: ChangeEventType, validator?: Validator) {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (type === "file") {
        const files = event.target.files;
        setFileList(files);
        event.target.files = null;
        event.target.value = "";
      } else {
        const value = event.target.value;
        if (type === ChangeEventType.NUMBER) {
          if (isEmptyString(value)) setValue(value);
          const formatted = parseInt(value, 10);
          if (isNaN(formatted)) return;
          setValue(`${formatted}`);
        } else {
          if (validator) {
            const validResult = validator(value);

            setIsValid(isTrue(validResult) || isNotSet(validResult));
          }
          setValue(event.target.value);
        }
      }
    },
    [type],
  );

  const reset = useCallback(() => {
    if (type === ChangeEventType.FILE) {
      setFileList(null);
    } else {
      setValue("");
    }
  }, [type]);

  return useMemo(() => {
    if (type === ChangeEventType.FILE) {
      return [fileList, onChange, reset];
    } else {
      if (type === ChangeEventType.NUMBER) {
        return [value, onChange, reset];
      } else {
        return [value, onChange, reset, isValid];
      }
    }
  }, [value, fileList, isValid, onChange, reset, type]);
}

export default useChangeEvent;
