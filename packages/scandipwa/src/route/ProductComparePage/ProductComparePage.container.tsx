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
import { connect } from 'react-redux';

import { Page } from 'Component/Header/Header.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { scrollToTop } from 'Util/Browser';
import DataContainer from 'Util/Request/DataContainer';

import ProductComparePage from './ProductComparePage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Route/ProductComparePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    isLoading: state.ProductCompareReducer.isLoading
});

/** @namespace Route/ProductComparePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(NavigationType.TOP_NAVIGATION_TYPE, stateName)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    }
});

/** @namespace Route/ProductComparePage/Container */
export class ProductComparePageContainer extends DataContainer {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        isLoading: false
    };

    __construct(props) {
        super.__construct(props, 'ProductComparePageContainer');
    }

    componentDidMount(): void {
        scrollToTop();
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeaderState();
    }

    containerProps() {
        const { isLoading } = this.props;

        return { isLoading };
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Product Compare') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/compare',
                name: __('Product Compare')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    updateHeaderState() {
        const { setHeaderState } = this.props;

        setHeaderState({
            name: Page.PRODUCT_COMPARE,
            title: __('Compare'),
            onBackClick: () => history.back()
        });
    }

    render(): ReactElement {
        return (
            <ProductComparePage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComparePageContainer);
