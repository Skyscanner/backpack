type Props = {
    children: any;
    href: string | null;
    className: string | null;
    disabled: boolean;
    onClick: ((event: any) => any) | null;
    submit: boolean;
    large: boolean;
    iconOnly: boolean;
    blank: boolean;
    rel: string | null;
};
export namespace propTypes {
    const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    const href: PropTypes.Requireable<string>;
    const className: PropTypes.Requireable<string>;
    const disabled: PropTypes.Requireable<boolean>;
    const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    const submit: PropTypes.Requireable<boolean>;
    const large: PropTypes.Requireable<boolean>;
    const iconOnly: PropTypes.Requireable<boolean>;
    const blank: PropTypes.Requireable<boolean>;
    const rel: PropTypes.Requireable<string>;
}
export namespace defaultProps {
    const href_1: null;
    export { href_1 as href };
    const className_1: null;
    export { className_1 as className };
    const disabled_1: boolean;
    export { disabled_1 as disabled };
    const onClick_1: null;
    export { onClick_1 as onClick };
    const submit_1: boolean;
    export { submit_1 as submit };
    const large_1: boolean;
    export { large_1 as large };
    const iconOnly_1: boolean;
    export { iconOnly_1 as iconOnly };
    const blank_1: boolean;
    export { blank_1 as blank };
    const rel_1: null;
    export { rel_1 as rel };
}
import PropTypes from "prop-types";
export {};
