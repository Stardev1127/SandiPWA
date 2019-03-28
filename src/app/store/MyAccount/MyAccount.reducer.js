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

import {
    UPDATE_SIGN_UP_LOAD_STATUS,
    UPDATE_SIGN_UP_INFO
} from './MyAccount.action';

const initialState = {
    isLoading: false,
    data: {}
};

const MyAccountReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_SIGN_UP_INFO:
        const { data: { createCustomer } } = action;

        return {
            ...state,
            data: createCustomer
        };

    case UPDATE_SIGN_UP_LOAD_STATUS:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default MyAccountReducer;
