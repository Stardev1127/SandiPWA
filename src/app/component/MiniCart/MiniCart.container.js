/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import MiniCart from './MiniCart.component';

const mapStateToProps = state => ({
    products: state.CartReducer.products,
    totals: state.CartReducer.totals
});

const mapDispatchToProps = dispatch => ({
    updateTotals: (options) => {
        CartDispatcher.updateTotals(dispatch, options);
    }
});

const MiniCartContainer = connect(mapStateToProps, mapDispatchToProps)(MiniCart);

export default MiniCartContainer;
