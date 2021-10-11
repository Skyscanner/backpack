import PropTypes from "prop-types";
import type { Props as CommonProps } from "./common-types";
declare type Props = CommonProps & {
    secondary: boolean;
    destructive: boolean;
    featured: boolean;
    outline: boolean;
    link: boolean;
    padded: boolean;
};
declare const BpkButton: {
    (props: Props): JSX.Element;
    propTypes: {
        secondary: PropTypes.Requireable<boolean>;
        destructive: PropTypes.Requireable<boolean>;
        featured: PropTypes.Requireable<boolean>;
        outline: PropTypes.Requireable<boolean>;
        padded: PropTypes.Requireable<boolean>;
        link: PropTypes.Requireable<boolean>;
        children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        href: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        submit: PropTypes.Requireable<boolean>;
        large: PropTypes.Requireable<boolean>;
        iconOnly: PropTypes.Requireable<boolean>;
        blank: PropTypes.Requireable<boolean>;
        rel: PropTypes.Requireable<string>;
    };
    defaultProps: {
        secondary: boolean;
        destructive: boolean;
        featured: boolean;
        outline: boolean;
        padded: boolean;
        link: boolean;
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
export default BpkButton;
