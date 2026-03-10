import { __awaiter, __decorate, __rest } from "tslib";
import { getWindowInfo } from '../common/wechat';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { debounce } from '../common/utils';
import transition from '../mixins/transition';
import pageScrollMixin from '../mixins/page-scroll';
delete props.visible;
const { prefix } = config;
const name = `${prefix}-popover`;
let Popover = class Popover extends SuperComponent {
    constructor() {
        super(...arguments);
        this.behaviors = [transition(), pageScrollMixin()];
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-trigger`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            _placement: 'top',
            contentStyle: '',
            arrowStyle: '',
        };
        this.controlledProps = [
            {
                key: 'visible',
                event: 'visible-change',
            },
        ];
        this.observers = {
            visible(val) {
                if (val === undefined || val === null)
                    return;
                this.updateVisible(val);
            },
            'placement, realVisible'(v) {
                if (v) {
                    this.computePosition();
                }
            },
        };
        this.methods = {
            onScroll() {
                if (this.data.realVisible) {
                    debounce(() => this.computePosition(), 100);
                }
            },
            updateVisible(visible) {
                if (visible === this.data.visible)
                    return;
                this.setData({ visible }, () => {
                    this._trigger('visible-change', { visible });
                });
            },
            onOverlayTap() {
                if (this.properties.closeOnClickOutside) {
                    this.updateVisible(false);
                }
            },
            getToward(placement) {
                const horizontal = ['top', 'bottom'];
                const vertical = ['left', 'right'];
                const isHorizontal = horizontal.find((item) => placement.includes(item));
                const isVertical = vertical.find((item) => placement.includes(item));
                const isBase = [...horizontal, ...vertical].find((item) => item === placement);
                const isEnd = placement.includes('end');
                return {
                    isHorizontal,
                    isVertical,
                    isBase,
                    isEnd,
                };
            },
            calcArrowStyle(placement, contentDom, popoverDom) {
                const { isHorizontal, isVertical, isBase, isEnd } = this.getToward(placement);
                if (isBase) {
                    return '';
                }
                const { width, left } = contentDom;
                const { width: popperWidth, height: popperHeight } = popoverDom;
                const { windowWidth } = getWindowInfo();
                if (isHorizontal) {
                    const padding = isEnd ? Math.min(width + left, popperWidth) : Math.min(windowWidth - left, popperWidth);
                    if (isEnd) {
                        return `left:${padding - 28}px;`;
                    }
                    return `right:${padding - 28}px;`;
                }
                if (isVertical) {
                    const offset = popperHeight - 28;
                    if (isEnd) {
                        return `top:${offset}px;`;
                    }
                    return `bottom:${offset}px;top:unset;`;
                }
                return '';
            },
            calcContentPosition(placement, triggerRect, contentRect) {
                let top = 0;
                let left = 0;
                const isTopBase = placement.startsWith('top');
                const isBottomBase = placement.startsWith('bottom');
                const isLeftBase = placement.startsWith('left');
                const isRightBase = placement.startsWith('right');
                if (isTopBase) {
                    top = triggerRect.top - contentRect.height;
                }
                else if (isBottomBase) {
                    top = triggerRect.top + triggerRect.height;
                }
                else if (isLeftBase) {
                    left = triggerRect.left - contentRect.width;
                }
                else if (isRightBase) {
                    left = triggerRect.left + triggerRect.width;
                }
                else {
                    top = triggerRect.top - contentRect.height;
                }
                const isStart = placement.includes('start');
                const isEnd = placement.includes('end');
                let align;
                if (isStart)
                    align = 'start';
                else if (isEnd)
                    align = 'end';
                else
                    align = 'center';
                if (isTopBase || isBottomBase) {
                    left = this.alignCrossAxis(triggerRect.left, triggerRect.width, contentRect.width, align);
                }
                if (isLeftBase || isRightBase) {
                    top = this.alignCrossAxis(triggerRect.top, triggerRect.height, contentRect.height, align);
                }
                return { top, left };
            },
            alignCrossAxis(start, triggerSize, contentSize, align) {
                if (align === 'start')
                    return start;
                if (align === 'end')
                    return start + triggerSize - contentSize;
                return start + triggerSize / 2 - contentSize / 2;
            },
            calcPlacement(placement, triggerRect, contentRect) {
                const { isHorizontal, isVertical } = this.getToward(placement);
                // 获取内容大小
                const { width: contentWidth, height: contentHeight } = contentRect;
                // 获取所在位置
                const { left: triggerLeft, top: triggerTop, right: triggerRight, bottom: triggerBottom } = triggerRect;
                // 是否能正常放置
                let canPlace = true;
                const { windowWidth, windowHeight } = getWindowInfo();
                let finalPlacement = placement;
                if (isHorizontal) {
                    if (placement.startsWith('top')) {
                        canPlace = triggerTop - contentHeight >= 0;
                    }
                    else if (placement.startsWith('bottom')) {
                        canPlace = triggerBottom + contentHeight <= windowHeight;
                    }
                }
                else if (isVertical) {
                    if (placement.startsWith('left')) {
                        canPlace = triggerLeft - contentWidth >= 0;
                    }
                    else if (placement.startsWith('right')) {
                        canPlace = triggerRight + contentWidth <= windowWidth;
                    }
                }
                if (!canPlace) {
                    // 反向
                    if (isHorizontal) {
                        finalPlacement = placement.startsWith('top')
                            ? placement.replace('top', 'bottom')
                            : placement.replace('bottom', 'top');
                    }
                    else if (isVertical) {
                        finalPlacement = placement.startsWith('left')
                            ? placement.replace('left', 'right')
                            : placement.replace('right', 'left');
                    }
                }
                const basePos = this.calcContentPosition(finalPlacement, triggerRect, contentRect);
                return Object.assign({ placement: finalPlacement }, basePos);
            },
            computePosition() {
                return __awaiter(this, void 0, void 0, function* () {
                    const { placement } = this.data;
                    const _placement = placement.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end');
                    // 此处必须要设置，否则计算的位置会出错
                    this.setData({ _placement });
                    const query = this.createSelectorQuery();
                    query.select(`#${name}-wrapper`).boundingClientRect();
                    query.select(`#${name}-content`).boundingClientRect();
                    query.selectViewport().scrollOffset();
                    query.exec((res) => {
                        const [triggerRect, contentRect, viewportOffset] = res;
                        if (!triggerRect || !contentRect)
                            return;
                        // 最终放置位置
                        const _a = this.calcPlacement(_placement, triggerRect, contentRect), { placement: finalPlacement } = _a, basePos = __rest(_a, ["placement"]);
                        // TODO 优化：滚动时可能导致箭头闪烁
                        this.setData({ _placement: finalPlacement });
                        const { scrollTop = 0, scrollLeft = 0 } = viewportOffset;
                        const top = basePos.top + scrollTop;
                        const left = basePos.left + scrollLeft;
                        const style = `top:${Math.max(top, 0)}px;left:${Math.max(left, 0)}px;`;
                        const arrowStyle = this.calcArrowStyle(_placement, triggerRect, contentRect);
                        this.setData({ contentStyle: style, arrowStyle });
                    });
                });
            },
        };
    }
};
Popover = __decorate([
    wxComponent()
], Popover);
export default Popover;

//# sourceMappingURL=popover.js.map
