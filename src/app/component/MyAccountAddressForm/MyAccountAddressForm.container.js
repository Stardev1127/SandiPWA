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
import MyAccountAddressForm from './MyAccountAddressForm.component';

export const mapStateToProps = state => ({
    countries: state.ConfigReducer.countries,
    default_country: state.ConfigReducer.default_country
});

// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(
    middleware(mapStateToProps, 'Component/MyAccountAddressForm/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/MyAccountAddressForm/Container/mapDispatchToProps')
)(MyAccountAddressForm);
