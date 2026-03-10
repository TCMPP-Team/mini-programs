import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import transition from '../mixins/transition';
import useCustomNavbar from '../mixins/using-custom-navbar';
delete props.visible;
const { prefix } = config;
const name = `${prefix}-popup`;
let Popup = class Popup extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
        this.behaviors = [transition(), useCustomNavbar];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.methods = {
            handleOverlayClick() {
                const { closeOnOverlayClick } = this.properties;
                if (closeOnOverlayClick) {
                    this.triggerEvent('visible-change', { visible: false, trigger: 'overlay' });
                }
            },
            handleClose() {
                this.triggerEvent('visible-change', { visible: false, trigger: 'close-btn' });
            },
        };
    }
};
Popup = __decorate([
    wxComponent()
], Popup);
export default Popup;

//# sourceMappingURL=popup.js.map
