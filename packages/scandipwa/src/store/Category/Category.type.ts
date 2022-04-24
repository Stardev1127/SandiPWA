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
import { AnyAction } from 'redux';

import { Category } from 'Query/Category.type';

export enum CategoryActionType {
    UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY'
}

export interface UpdateCurrentCategoryAction extends AnyAction {
    type: CategoryActionType.UPDATE_CURRENT_CATEGORY;
    category: Partial<Category>;
}

export type CategoryStore = {
    category: Partial<Category>;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CategoryReducer: CategoryStore;
    }
}

export type CategoryDispatcherData = {
    category: Category;
};
