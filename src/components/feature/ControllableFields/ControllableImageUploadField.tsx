import React, { PropsWithChildren, useCallback } from "react";
import { Control, FieldPath, useController } from "react-hook-form";
import { useToggle } from "react-use";

import axios from "axios";
import classNames from "classnames";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

import { urlValidate } from "@src/utils/validation";

import { S3StorageUploadResponse } from "@src/app/api/storage/route";

import useChangeEvent, { ChangeEventType } from "@src/hooks/useChangeEvent";

import { Input } from "@src/components/common/Fields";
import Flexbox from "@src/components/common/Flexbox";
import Modal from "@src/components/common/Modal";

interface Component extends CustomizeFunctionComponent {
  <TFormValues extends FieldValues, Name extends FieldPath<TFormValues>>(
    props: PropsWithChildren<{
      className?: string;
      control: Control<TFormValues>;
      name: Name;
      rules?: Omit<
        RegisterOptions<TFormValues, Name>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >;
    }>,
    context?: any,
  ): React.ReactElement | null;
}

const Button: React.FC<ElementProps<"button">> = ({
  children,
  className,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={classNames(
      "px-4 py-2",
      "text-fz-8-mobile text-white font-medium rounded",
      "disabled:bg-opacity-30",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export const ControllableImageUploadField: Component = ({
  control,
  name,
  // className,
  rules,
}) => {
  const [url, onUrlChange, _, isValid] = useChangeEvent(
    ChangeEventType.TEXT,
    urlValidate,
  );
  const [open, toggleOpen] = useToggle(false);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
  });

  const onConfirm = useCallback(() => {
    if (isValid) {
      onChange(url);
      toggleOpen();
    }
  }, [isValid, onChange, toggleOpen, url]);

  const onUploadSuccess = useCallback(
    (url: string) => {
      onChange(url);
      toggleOpen();
    },
    [onChange, toggleOpen],
  );

  return (
    <React.Fragment>
      <Modal show={open} onBackDrop={toggleOpen}>
        <div className={"p-12 w-130 bg-white rounded-xl"}>
          <div className={"mb-6"}>
            <label
              htmlFor={"url_input"}
              className={"block mb-2 text-fz-8-mobile text-gray-2 font-medium"}
            >
              圖片網址
            </label>
            <Input
              id={"url_input"}
              value={url}
              onChange={onUrlChange}
              withBorder
              placeholder={"https://..."}
              error={isValid ? undefined : "請輸入正確的網址"}
            />
          </div>
          <Flexbox>
            <Button
              disabled={!isValid || !url}
              className={"mr-4 bg-primary"}
              onClick={onConfirm}
            >
              確認
            </Button>
            <UploadButton onUploadSuccess={onUploadSuccess} />
            <Button className={"ml-auto bg-gray-5"} onClick={toggleOpen}>
              取消
            </Button>
          </Flexbox>
        </div>
      </Modal>
      {!value ? (
        <Button onClick={toggleOpen} className={"bg-primary"}>
          新增圖片
        </Button>
      ) : (
        <div className={"relative"}>
          <p className={"mb-2 p-2 bg-white text-gray-3 rounded"}>{value}</p>
          <Button onClick={toggleOpen} className={"bg-primary"}>
            更換圖片
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

const pickFile = () =>
  new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      else resolve(file);
    });
  });

const UploadButton: React.FC<{
  onUploadSuccess: (url: string) => void;
}> = ({ onUploadSuccess }) => {
  const onUploadClick = useCallback(async () => {
    const file = await pickFile();
    if (!file) return;
    const formData = new FormData();
    formData.set("image", file);
    const { data } = await axios.post<S3StorageUploadResponse>(
      "/api/storage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    onUploadSuccess(data.url);
  }, [onUploadSuccess]);
  return (
    <Button className={"bg-orange"} onClick={onUploadClick}>
      上傳圖檔
    </Button>
  );
};
