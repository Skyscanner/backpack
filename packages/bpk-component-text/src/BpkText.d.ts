import type { ReactNode } from 'react';
export declare const TEXT_STYLES: {
    readonly xs: "xs";
    readonly sm: "sm";
    readonly base: "base";
    readonly lg: "lg";
    readonly xl: "xl";
    readonly xxl: "xxl";
    readonly xxxl: "xxxl";
    readonly xxxxl: "xxxxl";
    readonly xxxxxl: "xxxxxl";
    readonly caption: "caption";
    readonly footnote: "footnote";
    readonly label1: "label-1";
    readonly label2: "label-2";
    readonly label3: "label-3";
    readonly bodyDefault: "body-default";
    readonly bodyLongform: "body-longform";
    readonly subheading: "subheading";
    readonly heading1: "heading-1";
    readonly heading2: "heading-2";
    readonly heading3: "heading-3";
    readonly heading4: "heading-4";
    readonly heading5: "heading-5";
    readonly hero1: "hero-1";
    readonly hero2: "hero-2";
    readonly hero3: "hero-3";
    readonly hero4: "hero-4";
    readonly hero5: "hero-5";
};
export declare const WEIGHT_STYLES: {
    readonly regular: "regular";
    readonly bold: "bold";
    readonly black: "black";
};
export type Weight = typeof WEIGHT_STYLES[keyof typeof WEIGHT_STYLES];
export type TextStyle = typeof TEXT_STYLES[keyof typeof TEXT_STYLES];
export type Tag = 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Props = {
    children: ReactNode;
    textStyle?: TextStyle;
    tagName?: Tag;
    className?: string | null;
    id?: string;
    /** @deprecated Use a different "textStyle" to achieve the desired weight. */
    bold?: boolean | null;
    /** @deprecated Use a different "textStyle" to achieve the desired weight. */
    weight?: Weight | null;
    [rest: string]: any;
};
declare const BpkText: ({ textStyle, tagName: TagName, className, bold, weight, children, ...rest }: Props) => JSX.Element;
export default BpkText;
