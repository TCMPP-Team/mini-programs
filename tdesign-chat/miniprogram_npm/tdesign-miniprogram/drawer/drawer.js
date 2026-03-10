import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import useCustomNavbar from '../mixins/using-custom-navbar';
const { prefix } = config;
const name = `${prefix}-drawer`;
let Drawer = class Drawer extends SuperComponent {
    constructor() {
        super(...arguments);
        this.behaviors = [useCustomNavbar];
        this.externalClasses = [];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            classPrefix: name,
        };
        this.methods = {
            // closeOnOverlayClick为true时才能触发popup的visible-change事件
            onVisibleChange({ detail }) {
                const { visible } = detail;
                const { showOverlay } = this.data;
                this.setData({
                    visible,
                });
                if (!visible) {
                    this.triggerEvent('close', { trigger: 'overlay' });
                }
                if (showOverlay) {
                    this.triggerEvent('overlay-click', { visible: visible });
                }
            },
            onItemClick(detail) {
                const { index, item } = detail.currentTarget.dataset;
                this.triggerEvent('item-click', { index, item });
            },
        };
    }
};
Drawer = __decorate([
    wxComponent()
], Drawer);
export default Drawer;

//# sourceMappingURL=drawer.js.map
