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

import CheckEmailQuery from 'Query/CheckEmail.query';
import { QueryDispatcher } from 'Util/Request';

import { updateEmailAvailable } from './Checkout.action';

/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 *  */
export class CheckoutDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('Checkout');
    }

    onSuccess(data, dispatch) {
        dispatch(updateEmailAvailable(data));
    }

    prepareRequest(options) {
        return CheckEmailQuery.getIsEmailAvailableQuery(options);
    }
}

export default new CheckoutDispatcher();
