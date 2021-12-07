/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { OrderTotalType } from 'Type/Order.type';
import { formatPrice } from 'Util/Price';

import './MyAccountOrderTotals.style';

/** @namespace Component/MyAccountOrderTotals/Component */
export class MyAccountOrderTotals extends PureComponent {
    static propTypes = {
        total: OrderTotalType.isRequired,
        colSpanPriceCount: PropTypes.string.isRequired,
        colSpanLabelCount: PropTypes.string.isRequired
    };

    renderTax(tax) {
        const { colSpanPriceCount, colSpanLabelCount } = this.props;
        const { amount: { value, currency }, title, rate } = tax;

        return (
            <tr key={ `${title}-${rate}` }>
                <th colSpan={ colSpanLabelCount }>{ `${title} (${rate})` }</th>
                <td colSpan={ colSpanPriceCount }>{ formatPrice(value, currency) }</td>
            </tr>
        );
    }

    renderTaxes() {
        const { total: { taxes } } = this.props;

        return taxes.map(this.renderTax.bind(this));
    }

    renderContent() {
        const {
            total: {
                subtotal: {
                    value: subtotalPrice
                },
                shipping_handling: {
                    total_amount: {
                        value: shippingHandlingPrice
                    }
                },
                grand_total: {
                    value: grandTotalPrice
                },
                total_tax: {
                    value: totalTaxPrice
                },
                base_grand_total: {
                    value: baseGrandTotalPrice
                }
            }
        } = this.props;

        const grandTotalMix = { block: 'MyAccountOrderTotals', elem: 'GrandTotal' };

        return (
            <>
                { this.renderPriceLine(__('Subtotal'), subtotalPrice) }
                { this.renderPriceLine(__('Shipping & Handling'), shippingHandlingPrice) }
                { this.renderPriceLine(__('Grand Total (Excl.Tax)'), grandTotalPrice - totalTaxPrice, grandTotalMix) }
                { this.renderTaxes() }
                { this.renderPriceLine(__('Tax'), totalTaxPrice) }
                { this.renderPriceLine(__('Grand Total (Incl.Tax)'), grandTotalPrice, grandTotalMix) }
                { this.renderPriceLine(__('Grand Total to be Charged'), baseGrandTotalPrice) }
            </>
        );
    }

    renderPriceLine(title, price, mix = {}) {
        const {
            total: { grand_total: { currency } },
            colSpanLabelCount,
            colSpanPriceCount
        } = this.props;

        return (
            <tr mix={ mix }>
                <th colSpan={ colSpanLabelCount }>{ title }</th>
                <td colSpan={ colSpanPriceCount }>{ formatPrice(price, currency) }</td>
            </tr>
        );
    }

    render() {
        const { total } = this.props;

        if (!total) {
            return null;
        }

        return (
            <tfoot
              block="MyAccountOrderTotals"
              elem="Wrapper"
            >
                { this.renderContent() }
            </tfoot>
        );
    }
}

export default MyAccountOrderTotals;
