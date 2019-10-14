/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-tdeme
 * @link https://gitdub.com/scandipwa/base-tdeme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { formatCurrency } from 'Util/Price';
import './MyAccountOrderTableRow.style';

import { baseOrderInfoType } from 'Type/Account';

class MyAccountOrderTableRow extends PureComponent {
    static propTypes = {
        base_order_info: baseOrderInfoType.isRequired,
        onViewClick: PropTypes.func.isRequired
    };

    render() {
        const {
            base_order_info: {
                created_at,
                status_label,
                increment_id,
                grand_total
            },
            onViewClick
        } = this.props;

        return (
            <tr onClick={ onViewClick } block="MyAccountOrderTableRow">
                <td>{ increment_id }</td>
                <td>{ created_at }</td>
                <td>{ status_label }</td>
                <td block="hidden-mobile">
                    { grand_total }
                    { /* TODO: get currency symbol */ }
                    { formatCurrency() }
                </td>
            </tr>
        );
    }
}

export default MyAccountOrderTableRow;
