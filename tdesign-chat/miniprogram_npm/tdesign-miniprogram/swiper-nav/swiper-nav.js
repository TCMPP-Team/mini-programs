import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
const { prefix } = config;
const name = `${prefix}-swiper-nav`;
let SwiperNav = class SwiperNav extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = {
            current: {
                type: Number,
                value: 0,
            },
            total: {
                type: Number,
                value: 0,
            },
            type: {
                type: String,
                value: 'dots',
            },
            minShowNum: {
                type: Number,
                value: 2,
            },
            showControls: {
                type: Boolean,
                value: false,
            },
            direction: {
                type: String,
                value: 'horizontal',
            },
            paginationPosition: {
                type: String,
                value: 'bottom',
            },
        };
        this.relations = {
            '../swiper/swiper': {
                type: 'parent',
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.methods = {
            nav(e) {
                var _a;
                const { dir } = e.target.dataset;
                const source = 'nav';
                this.triggerEvent('nav-btn-change', { dir, source });
                if (this.$parent) {
                    (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.doNavBtnChange(dir, source);
                }
            },
        };
    }
};
SwiperNav = __decorate([
    wxComponent()
], SwiperNav);
export default SwiperNav;

//# sourceMappingURL=swiper-nav.js.map
