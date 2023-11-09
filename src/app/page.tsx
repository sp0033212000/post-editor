"use client";

import React, { PropsWithChildren, useCallback, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useController,
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useToggle, useUpdateEffect } from "react-use";

import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import {
  faPlus,
  faPlusCircle,
  faTimes,
  faTimesCircle,
  faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import { UseFieldArrayAppend } from "react-hook-form/dist/types/fieldArray";

import { stringOfArrayRequiredValidate } from "@src/utils/validation";

import {
  Article,
  ArticleBody,
  ArticleWithSpecificBodyType,
  GetArticleBodyIncludeTypeByType,
  QATalkCategory,
  qaTalkCategoryOptions,
} from "@src/constant";
import { isRestrictedEmptyString } from "@src/utils";

import { Input, Select } from "@src/components/common/Fields";
import Flexbox from "@src/components/common/Flexbox";
import Modal from "@src/components/common/Modal";

import {
  Body,
  CallOut,
  Divider,
  Heading,
  Hyperlink,
  PostImage,
  PostList,
  Tags,
} from "@src/components/feature/article";

export default function Home() {
  const method = useForm<Article>({
    defaultValues: {
      id: "",
      title: "",
      category: QATalkCategory.ADVANTAGE,
      meta: {
        description: "",
        coverImage: "",
      },
      body: [],
    },
  });

  const body = method.watch("body");

  return (
    <FormProvider {...method}>
      <Drawer />
      <main className={"flex pl-130 w-screen"}>
        <div className={classNames("pt-[4.5rem] lg:pt-[6.25rem] w-full")}>
          <div
            className={classNames(
              "mx-auto",
              "py-16 px-6 lg2:px-60",
              "md:py-[7.5rem] md:px-15",
              "max-w-[75.625rem]",
            )}
          >
            {body.map((section, index) => (
              <ComponentDispatcher key={index} body={section} />
            ))}
          </div>
        </div>
      </main>
    </FormProvider>
  );
}

const Drawer = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<Article>();

  const onSubmit = useCallback<SubmitHandler<Article>>((data) => {
    const json = JSON.stringify(data, null, 2);
    // Save to plain text file (txt)
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.id}.txt`;
    link.click();
  }, []);

  return (
    <React.Fragment>
      <Flexbox
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        direction={"column"}
        className={classNames(
          "fixed left-0 top-0",
          "w-130 h-full overflow-hidden",
          "border-r border-gray-4",
        )}
      >
        <div className={"flex-1 p-6 overflow-scroll"}>
          <DrawerSection title={"Meta"} titleRightSide={<MetaReview />}>
            <div className={"space-y-4"}>
              <div>
                <FieldTitle>文章UID</FieldTitle>
                <Input
                  {...register("id", { required: true })}
                  error={errors["id"]}
                />
              </div>
              <div>
                <FieldTitle>文章標題</FieldTitle>
                <Input
                  {...register("title", { required: true })}
                  error={errors["title"]}
                />
              </div>
              <div>
                <FieldTitle>文章類別</FieldTitle>
                <Select
                  control={control}
                  name={"category"}
                  options={qaTalkCategoryOptions}
                />
              </div>
              <div>
                <FieldTitle>文章描述</FieldTitle>
                <Input
                  type={"textarea"}
                  {...register("meta.description", { required: true })}
                  error={errors["meta"]?.["description"]}
                />
              </div>
              <div>
                <FieldTitle>文章封面</FieldTitle>
                <Input
                  {...register("meta.coverImage", { required: true })}
                  error={errors["meta"]?.["coverImage"]}
                  placeholder={"https://..."}
                />
              </div>
            </div>
          </DrawerSection>
          <Content />
        </div>
        <div className={"flex-shrink-0 p-3 border-t border-gray-4"}>
          <button
            className={
              "py-1 w-full bg-primary text-fz-5 text-center text-white rounded-xl"
            }
          >
            匯出
          </button>
        </div>
      </Flexbox>
    </React.Fragment>
  );
};

const Content = () => {
  const { control } = useFormContext<Article>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "body",
  });

  return (
    <DrawerSection
      title={"Content"}
      titleRightSide={<BodyCreator append={append} />}
    >
      <div className={"space-y-2"}>
        {fields.map((field, index) => (
          <BlockFieldBox key={field.id} remove={remove} index={index} />
        ))}
      </div>
    </DrawerSection>
  );
};

const DrawerSection: React.FC<
  PropsWithChildren<{
    title: string;
    titleRightSide?: React.ReactNode;
  }>
> = ({ title, titleRightSide, children }) => {
  return (
    <section className={"relative mb-6 last:mb-0 p-4 bg-gray-6 rounded-xl"}>
      <Flexbox
        as={"p"}
        align={"center"}
        className={"mb-2 text-fz-4-mobile font-bold"}
      >
        {title}
        {titleRightSide}
      </Flexbox>
      {children}
    </section>
  );
};

const FieldTitle: React.FC<
  PropsWithChildren<{
    isRequired?: boolean;
  }>
> = ({ children, isRequired = true }) => {
  return (
    <Flexbox
      as={"p"}
      align={"center"}
      className={"relative mb-1 text-fz-8-mobile text-gray-3 font-bold"}
    >
      {children}
      {isRequired && <span className={"ml-1 text-red"}>*</span>}
    </Flexbox>
  );
};

const bodyDefaultValueGenerator = <Type = ArticleBody["type"],>(type: Type) => {
  switch (type) {
    case "tag":
      return {
        type,
        content: QATalkCategory.SCHOOL,
      } as GetArticleBodyIncludeTypeByType<"tag">;
    case "h1":
    case "h2":
    case "h3":
      return {
        type,
        content: ["這是標題"],
      } as GetArticleBodyIncludeTypeByType<"h1" | "h2" | "h3">;
    case "body":
      return {
        type,
        content: ["這是內文Body"],
      } as GetArticleBodyIncludeTypeByType<"body">;
    case "image":
      return {
        type,
        content: [
          {
            src: "/assets/images/image-placeholder.png",
            alt: "這是Image",
          },
        ],
      } as GetArticleBodyIncludeTypeByType<"image">;
    case "callout":
      return {
        type,
        content: ["這是Call Out"],
        cta: {
          text: "這是Call Out",
          action: "https://...",
        },
      } as GetArticleBodyIncludeTypeByType<"callout">;
    case "divider":
      return {
        type,
      } as GetArticleBodyIncludeTypeByType<"divider">;
    case "hyperlink":
      return {
        type,
        content: [{ title: "這是超連結", href: "https://hotcakeapp.com" }],
      } as GetArticleBodyIncludeTypeByType<"hyperlink">;
    case "list-decimal":
    case "list-dot":
      return {
        type,
        content: ["這是列表1", "這是列表2"],
      } as GetArticleBodyIncludeTypeByType<"list-decimal" | "list-dot">;
    default:
      throw new Error("Not implemented");
  }
};

const MetaReview: React.FC = () => {
  const [open, toggleOpen] = useToggle(false);
  const { watch } = useFormContext<Article>();

  const [title, meta] = watch(["title", "meta"], {
    title: "",
    meta: { description: "", coverImage: "" },
  });

  return (
    <React.Fragment>
      <Flexbox
        as={"button"}
        type={"button"}
        align={"center"}
        justify={"center"}
        className={"ml-auto w-4 h-4"}
        onClick={toggleOpen}
      >
        <FontAwesomeIcon
          icon={faFileInvoice}
          className={"w-4 h-4 text-primary"}
        />
      </Flexbox>
      <Modal show={open} className={"py-24 max-h-screen"}>
        <Flexbox
          as={"button"}
          type={"button"}
          align={"center"}
          justify={"center"}
          className={"absolute right-6 top-6"}
          onClick={toggleOpen}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={"w-8 h-8 text-primary"}
          />
        </Flexbox>
        <div
          className={classNames(
            "block",
            "mr-4 last:mr-0 md:mr-6",
            "p-6 md:p-10",
            "w-130",
            "bg-white",
            "rounded-3xl border border-gray-4",
            "flex-shrink-0",
          )}
        >
          <div className={"relative w-full"}>
            <div className={"pt-[calc(100%/220*124)]"} />
            <Image
              src={meta.coverImage}
              alt={title}
              fill
              className={"rounded-2xl"}
            />
          </div>
          <p
            className={classNames(
              "mt-4",
              "text-fz-5-mobile font-bold md:text-fz-5",
            )}
          >
            {title}
          </p>
          <p
            className={classNames(
              "mt-1 md:mt-2",
              "text-fz-6-mobile text-gray-2 md:text-fz-6",
              "whitespace-pre-line",
            )}
          >
            {meta.description}
          </p>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const BodyCreator: React.FC<{
  append: UseFieldArrayAppend<Article, "body">;
}> = ({ append }) => {
  const [open, toggleOpen] = useToggle(false);

  const onBlockClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const type = event.currentTarget.dataset.type as ArticleBody["type"];
      const defaultValue = bodyDefaultValueGenerator(type);
      append(defaultValue);
      toggleOpen(false);
    },
    [],
  );

  return (
    <React.Fragment>
      <Flexbox
        as={"button"}
        type={"button"}
        align={"center"}
        justify={"center"}
        className={"ml-auto w-4 h-4"}
        onClick={toggleOpen}
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          className={"w-4 h-4 text-primary"}
        />
      </Flexbox>
      <Modal show={open} className={"py-24 max-h-screen"}>
        <Flexbox
          direction={"column"}
          className={
            "relative w-1/2 h-full bg-white rounded-xl overflow-hidden"
          }
        >
          <Flexbox
            align={"center"}
            justify={"between"}
            className={"p-4 border-b border-gray-4"}
          >
            <h2 className={"text-fz-5 font-bold"}>新增文章區塊</h2>
            <button type={"button"} onClick={toggleOpen}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                className={"w-8 h-8 text-primary"}
              />
            </button>
          </Flexbox>
          <div className={"flex-1 p-6 space-y-4 overflow-scroll"}>
            <BlockCreateButton data-type={"tag"} onClick={onBlockClick}>
              <Tags content={QATalkCategory.SCHOOL} />
            </BlockCreateButton>
            <BlockCreateButton data-type={"h1"} onClick={onBlockClick}>
              <Heading level={"h1"}>這是標題H1</Heading>
            </BlockCreateButton>
            <BlockCreateButton data-type={"h2"} onClick={onBlockClick}>
              <Heading level={"h2"}>這是標題H2</Heading>
            </BlockCreateButton>
            <BlockCreateButton data-type={"h3"} onClick={onBlockClick}>
              <Heading level={"h3"}>這是標題H3</Heading>
            </BlockCreateButton>
            <BlockCreateButton data-type={"body"} onClick={onBlockClick}>
              <Body content={["這是內文Body"]} />
            </BlockCreateButton>
            <BlockCreateButton data-type={"image"} onClick={onBlockClick}>
              <PostImage
                content={[
                  {
                    src: "/assets/images/image-placeholder.png",
                    alt: "這是Image",
                  },
                ]}
              />
            </BlockCreateButton>
            <BlockCreateButton data-type={"callout"} onClick={onBlockClick}>
              <CallOut
                cta={{
                  text: "這是Call Out",
                  action: "https://...",
                }}
              >
                這是Call Out
              </CallOut>
            </BlockCreateButton>
            <BlockCreateButton data-type={"divider"} onClick={onBlockClick}>
              <Divider />
            </BlockCreateButton>
            <BlockCreateButton data-type={"hyperlink"} onClick={onBlockClick}>
              <Hyperlink
                content={[
                  { title: "這是超連結", href: "https://hotcakeapp.com" },
                ]}
              />
            </BlockCreateButton>
            <BlockCreateButton
              data-type={"list-decimal"}
              onClick={onBlockClick}
            >
              <PostList
                type={"list-decimal"}
                content={["這是列表1", "這是列表2"]}
              />
            </BlockCreateButton>
            <BlockCreateButton data-type={"list-dot"} onClick={onBlockClick}>
              <PostList
                type={"list-dot"}
                content={["這是列表1", "這是列表2"]}
              />
            </BlockCreateButton>
          </div>
        </Flexbox>
      </Modal>
    </React.Fragment>
  );
};

const BlockCreateButton: React.FC<
  PropsWithChildren<ElementProps<"button">>
> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "p-3 w-full border border-gray-4 rounded",
      )}
    >
      {children}
    </button>
  );
};

const BlockFieldBox: React.FC<
  PropsWithChildren<{
    remove: UseFieldArrayRemove;
    index: number;
  }>
> = ({ remove, index }) => {
  const { watch } = useFormContext<Article>();
  const bodyType = watch(`body.${index}.type`);

  return (
    <div className={"relative pb-2 border-b border-gray-4"}>
      <Flexbox align={"center"} className={"mb-1"}>
        <p className={"mr-auto font-bold text-gray-2"}>
          {bodyType.toLocaleUpperCase()}
        </p>
        <button type={"button"} onClick={() => remove(index)}>
          <FontAwesomeIcon icon={faTrash} className={"w-4 h-4 text-indigo"} />
        </button>
      </Flexbox>
      <BlockFieldDispatcher type={bodyType} index={index} />
    </div>
  );
};

const BlockFieldDispatcher: React.FC<
  PropsWithChildren<{
    type: ArticleBody["type"];
    index: number;
  }>
> = ({ type, index }) => {
  switch (type) {
    case "tag":
      return <TagField index={index} />;
    case "h1":
    case "h2":
    case "h3":
      return <HeadingField index={index} />;
    case "body":
      return <BodyField index={index} />;
    case "image":
      return <ImageField index={index} />;
    case "callout":
      return <CalloutField index={index} />;
    case "divider":
      return null;
    case "hyperlink":
      return <HyperlinkField index={index} />;
    case "list-decimal":
    case "list-dot":
      return <PostListField index={index} />;
    default:
      return null;
  }
};

const TagField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control } = useFormContext<Article>();

  return (
    <div>
      <FieldTitle>Content</FieldTitle>
      <Select
        control={control}
        name={`body.${index}.content`}
        options={qaTalkCategoryOptions}
        rules={{ required: true }}
      />
    </div>
  );
};

const ArrayStringField: React.FC<{
  title?: string;
  value: Array<string>;
  onChange: (value: Array<string>) => void;
  error: unknown;
}> = ({ title = "Content", value, onChange }) => {
  const [innerValue, setInnerValue] = useState<Array<string>>(value);

  useUpdateEffect(() => {
    onChange(innerValue);
  }, [innerValue]);

  const append = useCallback(() => {
    onChange([...value, "這是第N行"]);
  }, [value]);

  const remove = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const index = event.currentTarget.dataset.index;
      if (!index) return;

      setInnerValue((prev) => prev.filter((_, i) => i !== Number(index)));
    },
    [],
  );

  const onSubValueChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const subValue = event.currentTarget.value;
    const index = event.currentTarget.dataset.index;
    if (!index) return;

    setInnerValue((prev) => {
      const next = [...prev];
      next[Number(index)] = subValue;
      return next;
    });
  }, []);

  return (
    <div>
      <FieldTitle>
        {title}{" "}
        <Flexbox
          as={"button"}
          type={"button"}
          className={"ml-1"}
          onClick={append}
        >
          <FontAwesomeIcon icon={faPlus} className={"w-3 h-3 text-primary"} />
        </Flexbox>
      </FieldTitle>
      <div className={"space-y-2"}>
        {value.map((text, index) => (
          <Flexbox align={"center"} key={`text-${index}`} className={"w-full"}>
            <div className={"flex-1"}>
              <Input
                value={text}
                data-index={index}
                onChange={onSubValueChange}
                error={isRestrictedEmptyString(text) ? "Required" : undefined}
              />
            </div>
            {value.length > 1 && (
              <Flexbox
                as={"button"}
                type={"button"}
                className={"ml-1"}
                data-index={index}
                onClick={remove}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className={"w-3 h-3 text-primary"}
                />
              </Flexbox>
            )}
          </Flexbox>
        ))}
      </div>
    </div>
  );
};

const HeadingField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control } =
    useFormContext<ArticleWithSpecificBodyType<"h1" | "h2" | "h3">>();
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: `body.${index}.content`,
    control,
    rules: {
      validate: stringOfArrayRequiredValidate,
    },
  });

  const error = errors?.["body"]?.[index]?.["content"];

  return <ArrayStringField value={value} onChange={onChange} error={error} />;
};

const BodyField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control, register } =
    useFormContext<ArticleWithSpecificBodyType<"body">>();
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: `body.${index}.content`,
    control,
    rules: {
      validate: stringOfArrayRequiredValidate,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: `body.${index}.hypertext`,
  });

  const contentError = errors?.["body"]?.[index]?.["content"];

  const onAppendClick = useCallback(() => {
    append({ keyword: "這是關鍵字", href: "https://..." });
  }, [append]);

  const onRemoveClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const index = event.currentTarget.dataset.index;
      if (!index) return;
      remove(Number(index));
    },
    [remove],
  );

  return (
    <div className={"space-y-2"}>
      <ArrayStringField
        value={value}
        onChange={onChange}
        error={contentError}
      />
      <div>
        <FieldTitle isRequired={false}>
          Hypertext{" "}
          <Flexbox
            as={"button"}
            type={"button"}
            className={"ml-1"}
            onClick={onAppendClick}
          >
            <FontAwesomeIcon icon={faPlus} className={"w-3 h-3 text-primary"} />
          </Flexbox>
        </FieldTitle>
        <div className={"space-y-1"}>
          {fields.map((field, subIndex) => (
            <Flexbox key={field.id} align={"start"}>
              <Flexbox
                as={"p"}
                align={"center"}
                className={"w-15 text-fz-8-mobile leading-[38px] text-gray-3"}
              >
                Set {subIndex}
                <Flexbox
                  as={"button"}
                  type={"button"}
                  className={"ml-1"}
                  data-index={subIndex}
                  onClick={onRemoveClick}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={"w-3 h-3 text-primary"}
                  />
                </Flexbox>
              </Flexbox>
              <div className={"space-y-1 flex-1"}>
                <Input
                  {...register(`body.${index}.hypertext.${subIndex}.keyword`)}
                />
                <Input
                  {...register(`body.${index}.hypertext.${subIndex}.href`)}
                />
              </div>
            </Flexbox>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control, register } =
    useFormContext<ArticleWithSpecificBodyType<"image">>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `body.${index}.content`,
  });

  const onAppendClick = useCallback(() => {
    append({ alt: "圖片描述", src: "/assets/images/image-placeholder.png" });
  }, [append]);

  const onRemoveClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const index = event.currentTarget.dataset.index;
      if (!index) return;
      remove(Number(index));
    },
    [remove],
  );

  return (
    <div>
      <FieldTitle isRequired={false}>
        Content{" "}
        <Flexbox
          as={"button"}
          type={"button"}
          className={"ml-1"}
          onClick={onAppendClick}
        >
          <FontAwesomeIcon icon={faPlus} className={"w-3 h-3 text-primary"} />
        </Flexbox>
      </FieldTitle>
      <div className={"space-y-1"}>
        {fields.map((field, subIndex) => (
          <Flexbox key={field.id} align={"start"}>
            <Flexbox
              as={"p"}
              align={"center"}
              className={"w-15 text-fz-8-mobile leading-[38px] text-gray-3"}
            >
              Set {subIndex}
              <Flexbox
                as={"button"}
                type={"button"}
                className={"ml-1"}
                data-index={subIndex}
                onClick={onRemoveClick}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className={"w-3 h-3 text-primary"}
                />
              </Flexbox>
            </Flexbox>
            <div className={"space-y-1 flex-1"}>
              <Input {...register(`body.${index}.content.${subIndex}.src`)} />
              <Input {...register(`body.${index}.content.${subIndex}.alt`)} />
            </div>
          </Flexbox>
        ))}
      </div>
    </div>
  );
};

const CalloutField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control, register } =
    useFormContext<ArticleWithSpecificBodyType<"callout">>();
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: `body.${index}.content`,
    control,
    rules: {
      validate: stringOfArrayRequiredValidate,
    },
  });

  const contentError = errors?.["body"]?.[index]?.["content"];

  return (
    <div className={"space-y-2"}>
      <ArrayStringField
        value={value}
        onChange={onChange}
        error={contentError}
      />
      <div>
        <FieldTitle>Call to action</FieldTitle>
        <div className={"space-y-1"}>
          <div className={"space-y-1 flex-1"}>
            <Input
              {...register(`body.${index}.cta.text`, { required: true })}
            />
            <Input
              {...register(`body.${index}.cta.action`, { required: true })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HyperlinkField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control, register } =
    useFormContext<ArticleWithSpecificBodyType<"hyperlink">>();
  const { fields, append, remove } = useFieldArray({
    name: `body.${index}.content`,
    control,
    rules: { required: true },
  });

  const onAppendClick = useCallback(() => {
    append({ title: "網站描述", href: "https://hotcakeapp.com" });
  }, [append]);

  const onRemoveClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const index = event.currentTarget.dataset.index;
      if (!index) return;
      remove(Number(index));
    },
    [remove],
  );

  return (
    <div>
      <FieldTitle>
        Content{" "}
        <Flexbox
          as={"button"}
          type={"button"}
          className={"ml-1"}
          onClick={onAppendClick}
        >
          <FontAwesomeIcon icon={faPlus} className={"w-3 h-3 text-primary"} />
        </Flexbox>
      </FieldTitle>
      <div className={"space-y-1"}>
        {fields.map((field, subIndex) => (
          <Flexbox key={field.id} align={"start"}>
            <Flexbox
              as={"p"}
              align={"center"}
              className={"w-15 text-fz-8-mobile leading-[38px] text-gray-3"}
            >
              Set {subIndex}
              <Flexbox
                as={"button"}
                type={"button"}
                className={"ml-1"}
                data-index={subIndex}
                onClick={onRemoveClick}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className={"w-3 h-3 text-primary"}
                />
              </Flexbox>
            </Flexbox>
            <div className={"space-y-1 flex-1"}>
              <Input
                {...register(`body.${index}.content.${subIndex}.title`, {
                  required: true,
                })}
              />
              <Input
                {...register(`body.${index}.content.${subIndex}.href`, {
                  required: true,
                })}
              />
            </div>
          </Flexbox>
        ))}
      </div>
    </div>
  );
};

const PostListField: React.FC<{
  index: number;
}> = ({ index }) => {
  const { control } =
    useFormContext<ArticleWithSpecificBodyType<"list-decimal" | "list-dot">>();
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: `body.${index}.content`,
    control,
    rules: {
      validate: stringOfArrayRequiredValidate,
    },
  });

  const contentError = errors?.["body"]?.[index]?.["content"];

  return (
    <ArrayStringField value={value} onChange={onChange} error={contentError} />
  );
};

const ComponentDispatcher: React.FC<{
  body: Article["body"][number];
}> = ({ body }) => {
  switch (body.type) {
    case "body":
      return <Body hypertext={body.hypertext} content={body.content} />;
    case "tag":
      return <Tags content={body.content} />;
    case "image":
      return <PostImage content={body.content} />;
    case "callout":
      return <CallOut cta={body.cta}>{body.content}</CallOut>;
    case "divider":
      return <Divider />;
    case "hyperlink":
      return <Hyperlink content={body.content} />;
    case "list-dot":
    case "list-decimal":
      return <PostList type={body.type} content={body.content} />;
    default:
      return <Heading level={body.type}>{body.content.join("\n")}</Heading>;
  }
};
