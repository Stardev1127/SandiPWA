/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ValidationInputTypeText } from 'Util/Validator/Config';

export type Label = string | React.ReactNode;

export type Option = {
    id?: string | number;
    label?: Label;
    value?: string | number;
};

export type CustomErrorMessages = {
    onRequirementFail?: string;
    onInputTypeFail?: string;
    onMatchFail?: string;
    onRangeFailMin?: string;
    onRangeFailMax?: string;
    onExtensionFail?: string;
    onGroupFail?: string;
};

export type ValidationRule = {
    selector?: string;
    isRequired?: boolean;
    inputType?: ValidationInputTypeText;
    match?: () => void; // TODO: Check argument types
    customErrorMessages?: CustomErrorMessages;
    range?: {
        max?: number;
        min?: number;
    };
};

// TODO
export type Events = Record<string, unknown>;

// TODO
export type FieldAttr = unknown;

export type FieldOptions = {
    id?: string | number;
    label?: Label;
    value?: string | number;
};

export type ValuesShape = {
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
};

export type ErrorMessageShape = {
    injectables?: string[];
    value?: string;
};

export type ErrorFieldShape = {
    errorMessages?: ErrorMessageShape[];
    value?: string | boolean;
    type?: string | boolean;
    name?: string | boolean;
};

export type FieldGroupValidationResponse = {
    errorFields: ErrorFieldShape;
    errorMessages: ErrorMessageShape;
    values: ValuesShape;
} | boolean;

export type Date = number | string;
