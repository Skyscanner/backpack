import * as React from 'react';
import PropTypes from 'prop-types';
export declare type Props = {
    children: React.ReactNode;
    href: string | null | undefined;
    className: string | null | undefined;
    disabled: boolean;
    onClick: ((event: React.SyntheticEvent) => unknown) | null | undefined;
    submit: boolean;
    large: boolean;
    iconOnly: boolean;
    blank: boolean;
    rel: string | null | undefined;
};
declare const propTypes: {
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
declare const defaultProps: {
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
export { propTypes, defaultProps };
