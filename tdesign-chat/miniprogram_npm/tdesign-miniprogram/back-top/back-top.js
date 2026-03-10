import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-back-top`;
let BackTop = class BackTop extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-text`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.relations = {
            '../pull-down-refresh/pull-down-refresh': {
                type: 'ancestor',
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            _icon: null,
            hidden: true,
        };
        this.observers = {
            icon() {
                this.setIcon();
            },
            scrollTop(value) {
                const { visibilityHeight } = this.properties;
                this.setData({ hidden: value < visibilityHeight });
            },
        };
        this.lifetimes = {
            ready() {
                const { icon } = this.properties;
                this.setIcon(icon);
            },
        };
        this.methods = {
            setIcon(v) {
                this.setData({
                    _icon: calcIcon(v, 'backtop'),
                });
            },
            toTop() {
                var _a;
                this.triggerEvent('to-top');
                if (this.$parent) {
                    (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.setScrollTop(0);
                    this.setData({ hidden: true });
                }
                else {
                    wx.pageScrollTo({
                        scrollTop: 0,
                        duration: 300,
                    });
                }
            },
        };
    }
};
BackTop = __decorate([
    wxComponent()
], BackTop);
export default BackTop;

//# sourceMappingURL=back-top.js.map
