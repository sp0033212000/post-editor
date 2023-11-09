import { ValidationMap, WeakValidationMap } from "react";

import { KOODATA_GTAG_REPORT_CONVENTION_CODE } from "@/pages/_document";

export declare global {
  type ElementTagName = keyof JSX.IntrinsicElements;

  type ElementPropsWithRef<Tag extends ElementTagName> =
    JSX.IntrinsicElements[Tag];

  type ElementPropsWithoutRef<Tag extends ElementTagName> = Omit<
    ElementPropsWithRef<Tag>,
    "ref"
  >;

  type ElementProps<Tag extends ElementTagName, ExtractProps = {}> = {
    as?: Tag;
    conditional?: boolean;
  } & ElementPropsWithoutRef<Tag> &
    ExtractProps;

  interface CustomizeFunctionComponent<P = {}> {
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  interface CustomizeForwardRefRenderFunction {
    displayName?: string | undefined;
    // explicit rejected with `never` required due to
    // https://github.com/microsoft/TypeScript/issues/36826
    /**
     * defaultProps are not supported on render functions
     */
    defaultProps?: never | undefined;
    /**
     * propTypes are not supported on render functions
     */
    propTypes?: never | undefined;
  }

  interface Option<Key extends string = string> {
    key: Key;
    label: string;
    active?: boolean;
  }

  interface Window {
    loadPromise: Promise<void>;
    gtag_report_conversion: (
      sendTo: KOODATA_GTAG_REPORT_CONVENTION_CODE,
      url?: string,
    ) => void;
    _lt: (
      action: string,
      category: string,
      { type: string },
      tagIds: Array<string>,
    ) => void;
  }

  namespace NodeJS {
    interface ProcessEnv {
      AWS_S3_REGION: string;
    }
  }
}

declare module "axios" {
  export interface AxiosRequestConfig {
    disableLoader?: boolean;
    disableAlert?: boolean;
    bypassErrorNames?: Array<string>;
  }
}
