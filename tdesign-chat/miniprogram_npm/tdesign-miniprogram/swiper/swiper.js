import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-swiper`;
let Swiper = class Swiper extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-nav`,
            `${prefix}-class-image`,
            `${prefix}-class-prev-image`,
            `${prefix}-class-next-image`,
        ];
        this.options = {
            multipleSlots: true,
            pureDataPattern: /^_/,
        };
        this.properties = props;
        this.observers = {
            navCurrent(v) {
                this.updateNav(v);
            },
        };
        this.$nav = null;
        this.relations = {
            '../swiper-nav/swiper-nav': {
                type: 'child',
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            _source: '', // 触发源
        };
        this.lifetimes = {
            ready() {
                const { current } = this.properties;
                this.setData({ navCurrent: current });
            },
        };
        this.methods = {
            updateNav(currentValue) {
                var _a;
                if (this.data.navigation)
                    return;
                const $nav = (_a = this.getRelationNodes('./swiper-nav')) === null || _a === void 0 ? void 0 : _a[0];
                if (!$nav)
                    return;
                const { direction, paginationPosition, list } = this.properties;
                $nav.setData({
                    current: currentValue,
                    total: list.length,
                    direction,
                    paginationPosition,
                });
            },
            onTap(e) {
                const { index } = e.currentTarget.dataset;
                this.triggerEvent('click', { index });
            },
            onChange(e) {
                const { current, source } = e.detail;
                if (!source)
                    return;
                this.setData({
                    navCurrent: current,
                    _source: source,
                });
                this.triggerEvent('change', { current, source });
            },
            onAnimationFinish(e) {
                const { current, source } = e.detail;
                this.triggerEvent('animationfinish', { current, source: source || this.data._source });
            },
            onNavBtnChange(e) {
                const { dir, source } = e.detail;
                this.doNavBtnChange(dir, source);
            },
            doNavBtnChange(dir, source) {
                const { current, list, loop } = this.data;
                const count = list.length;
                let nextPos = dir === 'next' ? current + 1 : current - 1;
                if (loop) {
                    nextPos = dir === 'next' ? (current + 1) % count : (current - 1 + count) % count;
                }
                else {
                    nextPos = nextPos < 0 || nextPos >= count ? current : nextPos;
                }
                if (nextPos === current)
                    return;
                this.setData({
                    current: nextPos,
                    _source: source,
                });
                this.triggerEvent('change', { current: nextPos, source });
            },
            onImageLoad(e) {
                this.triggerEvent('image-load', { index: e.target.dataset.custom });
            },
        };
    }
};
Swiper = __decorate([
    wxComponent()
], Swiper);
export default Swiper;

//# sourceMappingURL=swiper.js.map
