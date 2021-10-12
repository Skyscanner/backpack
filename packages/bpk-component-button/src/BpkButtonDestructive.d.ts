export default BpkButtonDestructive;
declare function BpkButtonDestructive(props: Props): JSX.Element;
declare namespace BpkButtonDestructive {
    const propTypes: {
        children: import("prop-types").Validator<string | number | boolean | {} | import("prop-types").ReactElementLike | import("prop-types").ReactNodeArray>;
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
    const defaultProps: {
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
import { Props } from "./common-types";
