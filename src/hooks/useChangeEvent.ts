import React, { useCallback, useState } from 'react';

import { isEmptyString } from '@src/utils';

export enum ChangeEventType {
  TEXT = 'text',
  FILE = 'file',
  NUMBER = 'number',
}

type CleanValue = () => void;

function useChangeEvent(
  type?: ChangeEventType.TEXT | ChangeEventType.NUMBER
): [string, React.ChangeEventHandler<HTMLInputElement>, CleanValue];
function useChangeEvent(
  type: ChangeEventType.FILE
): [FileList | null, React.ChangeEventHandler<HTMLInputElement>, CleanValue];
function useChangeEvent(type?: ChangeEventType) {
  const [value, setValue] = useState<string>('');
  const [fileList, setFileList] = useState<FileList | null>(null);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (type === 'file') {
        const files = event.target.files;
        setFileList(files);
        event.target.files = null;
        event.target.value = '';
      } else {
        const value = event.target.value;
        if (type === ChangeEventType.NUMBER) {
          if (isEmptyString(value)) setValue(value);
          const formatted = parseInt(value, 10);
          if (isNaN(formatted)) return;
          setValue(`${formatted}`);
        } else {
          setValue(event.target.value);
        }
      }
    },
    [type]
  );

  const reset = useCallback(() => {
    if (type === ChangeEventType.FILE) {
      setFileList(null);
    } else {
      setValue('');
    }
  }, [type]);

  if (type === ChangeEventType.FILE) {
    return [fileList, onChange, reset];
  } else {
    return [value, onChange, reset];
  }
}

export default useChangeEvent;
