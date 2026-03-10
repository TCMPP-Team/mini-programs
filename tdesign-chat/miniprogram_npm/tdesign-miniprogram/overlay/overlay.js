import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import transition from '../mixins/transition';
import useCustomNavbar from '../mixins/using-custom-navbar';
const { prefix } = config;
const name = `${prefix}-overlay`;
let Overlay = class Overlay extends SuperComponent {
    constructor() {
        super(...arguments);
        this.properties = props;
        this.behaviors = [transition(), useCustomNavbar];
        this.data = {
            prefix,
            classPrefix: name,
            computedStyle: '',
            _zIndex: 11000,
        };
        this.observers = {
            backgroundColor(v) {
                this.setData({
                    computedStyle: v ? `background-color: ${v};` : '',
                });
            },
            zIndex(v) {
                if (v !== 0) {
                    this.setData({
                        _zIndex: v,
                    });
                }
            },
        };
        this.methods = {
            handleClick() {
                this.triggerEvent('click', { visible: !this.properties.visible });
            },
            noop() { },
        };
    }
};
Overlay = __decorate([
    wxComponent()
], Overlay);
export default Overlay;

//# sourceMappingURL=overlay.js.map
