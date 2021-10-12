export default BpkButtonLink;
declare function BpkButtonLink(props: Props): JSX.Element;
declare namespace BpkButtonLink {
    const propTypes: {
        padded: PropTypes.Requireable<boolean>;
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
        padded: boolean;
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
    padded: boolean;
};
import PropTypes from "prop-types";
