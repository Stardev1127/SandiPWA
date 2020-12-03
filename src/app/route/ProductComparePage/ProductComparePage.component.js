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

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import ProductCompare from 'Component/ProductCompare';
// import { DeviceType } from 'Type/Device';

/** @namespace Route/ComparePage/Component */
export class ProductComparePage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool // ,
        // device: DeviceType.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderPageContents() {
        const { isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <ContentWrapper label="Product Compare Page">
                <ProductCompare />
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="ProductComparePage">
                <Loader isLoading={ isLoading } />
                { this.renderPageContents() }
            </main>
        );
    }
}

export default ProductComparePage;
