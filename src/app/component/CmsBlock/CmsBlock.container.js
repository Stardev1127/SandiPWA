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
import CmsBlock from './CmsBlock.component';

export const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

export default connect(mapStateToProps)(CmsBlock);
