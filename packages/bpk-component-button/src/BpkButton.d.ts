export default BpkButton;
declare function BpkButton(props: Props): JSX.Element;
declare namespace BpkButton {
    const propTypes: {
        secondary: PropTypes.Requireable<boolean>;
        destructive: PropTypes.Requireable<boolean>;
        featured: PropTypes.Requireable<boolean>;
        outline: PropTypes.Requireable<boolean>;
        padded: PropTypes.Requireable<boolean>;
        link: PropTypes.Requireable<boolean>;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
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
    const defaultProps: {
        secondary: boolean;
        destructive: boolean;
        featured: boolean;
        outline: boolean;
        padded: boolean;
        link: boolean;
        href: null;
        className: null;
        disabled: boolean;
        onClick: null;
        submit: boolean;
        large: boolean;
        iconOnly: boolean;
        blank: boolean;
        rel: null;
    };
}
type Props = {
    CommonProps: any;
    secondary: boolean;
    destructive: boolean;
    featured: boolean;
    outline: boolean;
    link: boolean;
    padded: boolean;
};
import PropTypes from "prop-types";
