import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-loading`;
let Loading = class Loading extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-text`, `${prefix}-class-indicator`];
        this.data = {
            prefix,
            classPrefix: name,
            show: true,
        };
        this.options = {
            multipleSlots: true,
        };
        this.properties = Object.assign({}, props);
        this.timer = null;
        this.observers = {
            loading(cur) {
                const { delay } = this.properties;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                if (cur) {
                    if (delay) {
                        this.timer = setTimeout(() => {
                            this.setData({ show: cur });
                            this.timer = null;
                        }, delay);
                    }
                    else {
                        this.setData({ show: cur });
                    }
                }
                else {
                    this.setData({ show: cur });
                }
            },
        };
        this.lifetimes = {
            detached() {
                clearTimeout(this.timer);
            },
        };
    }
    refreshPage() {
        this.triggerEvent('reload');
    }
};
Loading = __decorate([
    wxComponent()
], Loading);
export default Loading;

//# sourceMappingURL=loading.js.map
