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
import Menu from './Menu.component';

const mapStateToProps = state => ({
    menu: state.HeaderAndFooterReducer.menu
});

const MenuContainer = connect(mapStateToProps)(Menu);

export default MenuContainer;
