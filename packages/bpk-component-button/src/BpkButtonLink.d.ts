import PropTypes from "prop-types";
import type { Props as CommonProps } from "./common-types";
declare type Props = CommonProps & {
    padded: boolean;
};
declare const BpkButtonLink: {
    (props: Props): JSX.Element;
    propTypes: {
        padded: PropTypes.Requireable<boolean>;
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
        padded: boolean;
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
export default BpkButtonLink;
