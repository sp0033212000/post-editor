import React, { PropsWithChildren, useMemo } from "react";

import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";

import { HandPointUp } from "@/public/assets/images/icons";
import {
  GetArticleBodyByType,
  QA_TALK_CATEGORY_LABEL,
  QATalkCategory,
} from "@src/constant/qa-talk";
import { isSet } from "@src/utils";

import Flexbox from "@src/components/common/Flexbox";

export const Tags: React.FC<{
  content: QATalkCategory | `${QATalkCategory}`;
}> = ({ content }) => {
  return (
    <Flexbox
      as={"div"}
      align={"center"}
      justify={"start"}
      className={classNames(
        "text-fz-7-mobile font-bold text-primary md:text-fz-7",
      )}
    >
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        className={"mr-2 h-[1.25rem] md:h-4"}
      />
      {QA_TALK_CATEGORY_LABEL[content]}
    </Flexbox>
  );
};

export const Heading: React.FC<
  PropsWithChildren<{
    level: "h1" | "h2" | "h3";
  }>
> = ({ children, level }) => {
  return React.createElement(
    level,
    {
      className: classNames({
        "mt-2 md:mt-4 text-fz-3-mobile font-bold whitespace-pre-line md:text-fz-3":
          level === "h1",
        "mt-10 md:mt-16 text-fz-4-mobile font-bold whitespace-pre-line md:text-fz-4":
          level === "h2",
        "mt-8 md:mt-14 text-fz-5-mobile font-bold whitespace-pre-line md:text-fz-5":
          level === "h3",
      }),
    },
    children,
  );
};

export const Body: React.FC<GetArticleBodyByType<"body">> = ({
  content,
  hypertext,
}) => {
  const serializedContent = useMemo(() => {
    // Replace the keyword in the content with the keyword in hypertext to the anchor tag
    let compoundContent = content.join("\n");
    hypertext?.forEach(({ keyword, href }, index) => {
      compoundContent = compoundContent.replace(
        new RegExp(keyword, "g"),
        `{{hypertext:${index}}}`,
      );
    });
    return compoundContent.split(/(\{\{hypertext:\d}}+)/g);
  }, [content, hypertext]);

  return (
    <div className={"mt-4 md:mt-8"}>
      <Paragraph>
        {serializedContent.map((content, index) => {
          const [_, matchedIndex] = content.match(/\{\{hypertext:(\d)}}/) ?? [];
          if (isSet(matchedIndex)) {
            const meta = hypertext?.[Number(matchedIndex)];
            return (
              <a
                key={index}
                className={"text-primary underline"}
                href={meta?.href}
                target={"_blank"}
                rel={"noreferrer noopener"}
              >
                {meta?.keyword}
              </a>
            );
          } else return <React.Fragment key={index}>{content}</React.Fragment>;
        })}
      </Paragraph>
    </div>
  );
};

export const Paragraph: React.FC<ElementProps<"p">> = ({
  children,
  ...props
}) => {
  return (
    <p
      className={classNames(
        "text-fz-6-mobile text-gray-2 md:text-fz-6",
        "whitespace-pre-line",
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export const PostImage: React.FC<{
  content: Array<{
    src: string;
    alt: string;
  }>;
}> = ({ content }) => {
  return (
    <div className={classNames("relative mt-6 mb-2 w-full md:mb-4 md:mt-8")}>
      {content.map(({ src, alt }) => (
        <div key={alt} className={classNames("relative w-full")}>
          <div className={"pt-[calc(100%/16*9)]"} />
          <div className={"absolute top-0 left-0 h-full w-full"}>
            <Image src={src} alt={alt} fill className={"object-cover"} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const CallOut: React.FC<
  PropsWithChildren<{
    cta: {
      text: string;
      action: string;
    };
  }>
> = ({ cta, children }) => {
  return (
    <Flexbox
      align={"start"}
      className={classNames(
        "mt-6 md:mt-10",
        "p-4 md:py-6 md:px-8",
        "rounded-2xl bg-primary-light",
      )}
    >
      <HandPointUp
        className={classNames(
          "mr-4 md:mr-6",
          "h-10 w-10 md:h-14 md:w-14",
          "flex-shrink-0",
        )}
      />
      <div>
        <div
          className={classNames(
            "mb-4 md:mb-6",
            "text-fz-6-mobile text-gray-2 md:text-fz-6",
          )}
        >
          {children}
        </div>
        <div
          rel={"noreferrer noopener"}
          className={classNames(
            "block",
            "py-2 px-6",
            "w-fit",
            "text-fz-7-mobile font-bold text-white md:text-fz-7",
            "bg-primary",
            "rounded-full",
          )}
        >
          {cta.text}
        </div>
      </div>
    </Flexbox>
  );
};

export const Divider = () => {
  return <div className={classNames("mt-10 h-px w-full bg-gray-5 md:mt-16")} />;
};

export const Hyperlink: React.FC<{
  content: Array<{
    title: string;
    href: string;
  }>;
}> = ({ content }) => {
  return (
    <Flexbox
      direction={"column"}
      className={classNames(
        "mt-4 md:mt-8",
        "text-fz-6-mobile text-primary md:text-fz-6",
        "underline",
      )}
    >
      {content.map(({ title, href }) => (
        <a
          key={title}
          target={"_blank"}
          rel={"noreferrer noopener"}
          href={href}
        >
          {title}
        </a>
      ))}
    </Flexbox>
  );
};

export const PostList: React.FC<{
  type: "list-decimal" | "list-dot";
  content: Array<string>;
}> = ({ type, content }) => {
  return (
    <ul
      className={classNames(
        "mt-4 md:mt-8",
        "text-fz-5-mobile text-gray-2 md:text-fz-5",
      )}
    >
      {content.map((item, index) => (
        <Flexbox
          as={"li"}
          key={item}
          className={classNames(
            "mt-4",
            "list-inside",
            "list-none",
            "text-fz-5-mobile md:text-fz-5",
          )}
        >
          <Flexbox
            align={"center"}
            justify={"center"}
            className={"mr-2 h-[2.375rem]"}
          >
            {type === "list-dot" && (
              <span className={"h-1 w-1 rounded-full bg-gray-2"} />
            )}
            {type === "list-decimal" && <span>{index + 1}.</span>}
          </Flexbox>
          <p>{item}</p>
        </Flexbox>
      ))}
    </ul>
  );
};
