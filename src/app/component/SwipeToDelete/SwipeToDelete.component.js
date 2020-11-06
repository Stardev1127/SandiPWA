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
import { createRef, PureComponent } from 'react';

import Draggable from 'Component/Draggable';
import { ChildrenType } from 'Type/Common';
import CSS from 'Util/CSS';

import {
    ANIMATION_DURATION,
    DRAG_ITEM_REMOVE_TRESHOLD,
    DRAG_RIGHT_OPEN_TRESHHOLD,
    DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD
} from './SwipeToDelete.config';

import './SwipeToDelete.style';

/** @namespace Component/SwipeToDelete/Component */
export class SwipeToDelete extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        dragRightOpenTriggerThreshold: PropTypes.number,
        dragRightOpenThreshold: PropTypes.number,
        dragItemRemoveTreshold: PropTypes.number,
        animationDuration: PropTypes.number,
        renderRightSideContent: PropTypes.func,
        rightSideMix: PropTypes.object,
        topElemMix: PropTypes.object,
        onAheadOfDragItemRemoveTheshold: PropTypes.func
    };

    static defaultProps = {
        // Threshhold after we open right side
        dragRightOpenTriggerThreshold: DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD,
        // Width of opeded right side
        dragRightOpenThreshold: DRAG_RIGHT_OPEN_TRESHHOLD,
        // Treshold after we remove item on touchend as percentage of item width
        dragItemRemoveTreshold: DRAG_ITEM_REMOVE_TRESHOLD,
        animationDuration: ANIMATION_DURATION,
        renderRightSideContent: () => {},
        rightSideMix: {},
        topElemMix: {},
        onAheadOfDragItemRemoveTheshold: () => {}
    };

    state = {
        isRightSideOpen: false,
        isAheadRemoveItemThreshold: false
    };

    draggableRef = createRef();

    draggableRemoveThreshold;

    componentDidMount() {
        // Sets default style
        this.setTranlateXStyle(0);
        this.setRightSideContentWidth();
        this.setDraggableRemoveThreshold();
    }

    setRightSideContentWidth() {
        const { dragRightOpenThreshold } = this.props;
        CSS.setVariable(this.draggableRef, 'right-side-content-width', `${ dragRightOpenThreshold }px`);
    }

    setTranlateXStyle(translate) {
        CSS.setVariable(this.draggableRef, 'translateX', `${ translate }px`);
    }

    setDraggableRemoveThreshold() {
        const { draggableRef } = this;
        const {
            dragRightOpenThreshold,
            dragItemRemoveTreshold
        } = this.props;
        const { width } = draggableRef.current.getBoundingClientRect();
        this.draggableRemoveThreshold = width * dragItemRemoveTreshold - dragRightOpenThreshold;
    }

    setAnimationSpeedStyle(specAnimationDuration) {
        const { animationDuration } = this.props;

        const duration = specAnimationDuration === undefined
            ? animationDuration
            : specAnimationDuration;

        CSS.setVariable(this.draggableRef, 'animation-speed', `${ duration }ms`);
    }

    handleDragStart = () => {
        // Remove animation when drag starts
        this.setAnimationSpeedStyle(0);
    };

    handleDrag = ({ translateX }) => {
        const { dragRightOpenThreshold } = this.props;
        const { isRightSideOpen, isAheadRemoveItemThreshold } = this.state;
        const { draggableRemoveThreshold } = this;
        const nextIsAheadRemoveItemThreshold = Math.abs(translateX) > draggableRemoveThreshold;

        if (isAheadRemoveItemThreshold !== nextIsAheadRemoveItemThreshold) {
            this.setState({
                isAheadRemoveItemThreshold: nextIsAheadRemoveItemThreshold
            });
        }

        // When draging to left from current start point, going negative translateX
        if (translateX <= 0) {
            const translate = isRightSideOpen
                // Add (remove to have minus value) opened content width, to have full -translateX value
                ? translateX - dragRightOpenThreshold
                : translateX;

            this.setTranlateXStyle(translate);

            return;
        }

        // When draging to right from current start point, going positive translateX
        if (translateX > 0) {
            // When translate goes out of screen
            if (!isRightSideOpen || (isRightSideOpen && translateX - dragRightOpenThreshold > 0)) {
                this.setTranlateXStyle(0);

                return;
            }

            // When content is openeded and draging to right side
            if (translateX - dragRightOpenThreshold < 0 && isRightSideOpen) {
                // Add (remove to have minus value) opened content width, to have full -translateX value
                this.setTranlateXStyle(translateX - dragRightOpenThreshold);
            }
        }
    };

    handleDragEnd = ({ translateX }) => {
        const {
            dragRightOpenThreshold,
            dragRightOpenTriggerThreshold,
            onAheadOfDragItemRemoveTheshold
        } = this.props;
        const { isAheadRemoveItemThreshold } = this.state;

        this.setAnimationSpeedStyle();
        const shouldOpen = translateX > -dragRightOpenTriggerThreshold;

        if (isAheadRemoveItemThreshold) {
            this.setState({ isAheadRemoveItemThreshold: false });
            this.setTranlateXStyle(0);
            onAheadOfDragItemRemoveTheshold();
            return;
        }

        this.setState({ isRightSideOpen: !shouldOpen });

        if (shouldOpen) {
            this.setTranlateXStyle(0);

            return;
        }

        this.setTranlateXStyle(-dragRightOpenThreshold);
    };

    renderRightSideContent() {
        const { renderRightSideContent, rightSideMix } = this.props;
        const { isAheadRemoveItemThreshold } = this.state;

        return (
            <div
              block="SwipeToDelete"
              elem="RightSideContentWrapper"
            >
                <div
                  block="SwipeToDelete"
                  elem="RightSideContent"
                  mods={ { isAheadRemoveItemThreshold } }
                  mix={ rightSideMix }
                >
                    { renderRightSideContent() }
                </div>
            </div>
        );
    }

    renderChildren() {
        const { children } = this.props;

        return (
            <>
                <div
                  block="SwipeToDelete"
                  role="button"
                  tabIndex="0"
                  // eslint-disable-next-line react/jsx-no-bind
                  onMouseDown={ (e) => e.stopPropagation() }
                >
                    { children }
                </div>
                { this.renderRightSideContent() }
            </>
        );
    }

    render() {
        const { topElemMix } = this.props;

        return (
            <Draggable
              onDrag={ this.handleDrag }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              mix={ topElemMix }
            >
                { this.renderChildren() }
            </Draggable>
        );
    }
}

export default SwipeToDelete;
