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
import { PureComponent } from 'react';

import FIELD_TYPE from 'Component/PureForm/Field/Field.config';

import './CheckoutBilling.style';

/** @namespace Component/CheckoutBilling/Component */
export class CheckoutBilling extends PureComponent {
    static prop = {
        onAddressUpdate: PropTypes.func.isRequired,
        onSubmitAddressForm: PropTypes.func.isRequired
    };

    renderLoginForm() {

    }

    renderAddress() {
        // Renders address book

        // Renders address form
    }

    renderPaymentMethods() {

    }

    renderRulesAndConditions() {

    }

    renderAction() {
        return (
            <button type={ FIELD_TYPE.submit }>
                { __('Complete order') }
            </button>
        );
    }

    render() {
        return null;
    }
}

export default CheckoutBilling;
