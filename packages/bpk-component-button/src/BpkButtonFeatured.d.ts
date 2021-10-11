import type { Props } from "./common-types";
declare const BpkButtonFeatured: {
    (props: Props): JSX.Element;
    propTypes: {
        children: import("prop-types").Validator<import("prop-types").ReactNodeLike>;
        href: import("prop-types").Requireable<string>;
        className: import("prop-types").Requireable<string>;
        disabled: import("prop-types").Requireable<boolean>;
        onClick: import("prop-types").Requireable<(...args: any[]) => any>;
        submit: import("prop-types").Requireable<boolean>;
        large: import("prop-types").Requireable<boolean>;
        iconOnly: import("prop-types").Requireable<boolean>;
        blank: import("prop-types").Requireable<boolean>;
        rel: import("prop-types").Requireable<string>;
    };
    defaultProps: {
        href: any;
        className: any;
        disabled: boolean;
        onClick: any;
        submit: boolean;
        large: boolean;
        iconOnly: boolean;
        blank: boolean;
        rel: any;
    };
};
export default BpkButtonFeatured;
