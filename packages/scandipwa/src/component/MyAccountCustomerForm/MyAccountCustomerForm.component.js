/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';

import FieldForm from 'Component/PureForm/FieldForm';
import { customerType } from 'Type/Account';
import transformToNameValuePair from 'Util/Form/Transform';

import { customerEmailAndPasswordFields, customerInformationFields } from './MyAccountCustomerForm.form';

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm {
    static propTypes = {
        customer: customerType.isRequired,
        onSave: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired,
        showEmailChangeField: PropTypes.bool.isRequired,
        showPasswordChangeField: PropTypes.bool.isRequired,
        handleChangeEmailCheckbox: PropTypes.func.isRequired,
        handleChangePasswordCheckbox: PropTypes.func.isRequired
    };

    onFormSuccess = (form, fields) => {
        const { onSave } = this.props;
        onSave(transformToNameValuePair(fields));
    };

    get customerInformationFieldMap() {
        const {
            showTaxVatNumber,
            handleChangeEmailCheckbox,
            handleChangePasswordCheckbox,
            showEmailChangeField,
            showPasswordChangeField,
            customer: {
                firstname = '',
                lastname = '',
                taxvat = '',
                email = ''
            }
        } = this.props;

        return customerInformationFields({
            showTaxVatNumber,
            firstname,
            lastname,
            taxvat,
            email,
            handleChangePasswordCheckbox,
            handleChangeEmailCheckbox,
            showEmailChangeField,
            showPasswordChangeField
        });
    }

    get emailAndPasswordFieldMap() {
        const {
            showEmailChangeField,
            showPasswordChangeField,
            customer: {
                email
            }
        } = this.props;

        return customerEmailAndPasswordFields({
            showEmailChangeField,
            showPasswordChangeField,
            email
        });
    }

    renderActions() {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'MyAccountInformation', elem: 'Submit' } }
            >
                { __('Save') }
            </button>
        );
    }

    getFormProps() {
        return {
            onSubmit: this.onFormSuccess
        };
    }

    renderEmailAndPasswordFields() {
        const { showEmailChangeField, showPasswordChangeField } = this.props;

        if (!showEmailChangeField && !showPasswordChangeField) {
            return null;
        }

        return (
            <>
                <legend
                  block="FieldForm"
                  elem="Legend"
                >
                    { __('Change %s', this.getLegendString()) }
                </legend>
                { this.emailAndPasswordFieldMap.map(this.renderSection) }
            </>
        );
    }

    getLegendString() {
        const { showEmailChangeField, showPasswordChangeField } = this.props;

        if (showEmailChangeField && !showPasswordChangeField) {
            return 'Email';
        }

        if (!showEmailChangeField && showPasswordChangeField) {
            return 'Password';
        }

        return 'Email and Password';
    }

    renderFormBody() {
        return (
            <div block="FieldForm" elem="Body">
                <div block="FieldForm" elem="Fields">
                    <div block="FieldForm" elem="Section">
                    <legend
                      block="FieldForm"
                      elem="Legend"
                    >
                        { __('Account Information') }
                    </legend>
                        { this.customerInformationFieldMap.map(this.renderSection) }
                    </div>
                    <div block="FieldForm" elem="Section">
                        { this.renderEmailAndPasswordFields() }
                    </div>
                </div>
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerForm;
