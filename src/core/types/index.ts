export type IBlockType = "block";
export type IInlineType = "inline";
export type IBlockStyle =
  | "paragraph"
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "section";
export type IInlineStyle =
  | "span"
  | "link"
  | "bold"
  | "italic"
  | "code"
  | "underline"
  | "line-through";

export type IPortableBlock = {
  _marks?: IPortableBlockMark[];
  _type: IBlockType;
  _key: string;
  _style: IBlockStyle;
  _children?: (IPortableInline | IPortableBlock)[];
  _attrs?: Record<string, string>;
};
export type IPortableInline<P = IInlineStyle> = {
  _type: IInlineType;
  _key: string;
  _style: P;
  _text?: string;
  _children?: IPortableInline[];
  _attrs?: Record<string, string>;
};

export type ICustomMark = any;

export enum IBuiltInMark {
  TextLeft,
  TextRight,
  TextCenter,
  TextJustify,
}

export type IMark = IBuiltInMark | ICustomMark;

export type IPortableBlockMark = IMark;
