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

import { connect } from 'react-redux';
import { UrlRewritesDispatcher } from 'Store/UrlRewrites';
import UrlRewrites from './UrlRewrites.component';

export const mapStateToProps = middleware(
    state => ({
        urlRewrite: state.UrlRewritesReducer.urlRewrite
    }),
    'Route/UrlRewrites/Container/mapStateToProps'
);

export const mapDispatchToProps = middleware(
    dispatch => ({
        requestUrlRewrite: (options) => {
            UrlRewritesDispatcher.handleData(dispatch, options);
        },
        clearUrlRewrites: () => {
            UrlRewritesDispatcher.clearUrlRewrites(dispatch);
        }
    }),
    'Route/UrlRewrites/Container/mapDispatchToProps'
);

export default connect(mapStateToProps, mapDispatchToProps)(UrlRewrites);
