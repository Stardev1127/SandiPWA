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
import HomeSlider from './HomeSlider.component';

export const mapStateToProps = state => ({
    gallery: state.CmsBlocksAndSliderReducer.slider.slides
});

export default connect(mapStateToProps)(HomeSlider);
