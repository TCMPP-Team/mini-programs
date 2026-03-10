import { __decorate } from "tslib";
import { wxComponent, SuperComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-switch`;
let Switch = class Switch extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-label`, `${prefix}-class-body`, `${prefix}-class-dot`];
        this.behaviors = ['wx://form-field'];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            checked: false,
        };
        // lifetimes = {
        //   attached() {
        //     const { value, customValue } = this.data;
        //     const [activeValue] = customValue;
        //     this.setData({
        //       checked: value === activeValue,
        //     });
        //   },
        // };
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            value(val) {
                const [activeValue] = this.data.customValue;
                this.setData({
                    checked: val === activeValue,
                });
            },
        };
        this.methods = {
            handleSwitch() {
                const { loading, disabled, value, customValue } = this.data;
                const [activeValue, inactiveValue] = customValue;
                if (loading || disabled)
                    return;
                this._trigger('change', {
                    value: value === activeValue ? inactiveValue : activeValue,
                });
            },
        };
    }
};
Switch = __decorate([
    wxComponent()
], Switch);
export default Switch;

//# sourceMappingURL=switch.js.map
