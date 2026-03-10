import { __decorate } from "tslib";
import { wxComponent, SuperComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const classPrefix = `${prefix}-tab-bar`;
let Tabbar = class Tabbar extends SuperComponent {
    constructor() {
        super(...arguments);
        this.relations = {
            '../tab-bar-item/tab-bar-item': {
                type: 'descendant',
            },
        };
        this.externalClasses = [`${prefix}-class`];
        this.backupValue = -1;
        this.data = {
            prefix,
            classPrefix,
        };
        this.properties = props;
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            value() {
                this.updateChildren();
            },
        };
        this.lifetimes = {
            ready() {
                this.showChildren();
            },
        };
        this.methods = {
            showChildren() {
                const { value } = this.data;
                this.$children.forEach((child) => {
                    child.setData({ crowded: this.$children.length > 3 });
                    if (child.properties.value === value) {
                        child.showSpread();
                    }
                });
            },
            updateChildren() {
                const { value } = this.data;
                this.$children.forEach((child) => {
                    child.checkActive(value);
                });
            },
            updateValue(value) {
                this._trigger('change', { value });
            },
            changeOtherSpread(value) {
                this.$children.forEach((child) => {
                    if (child.properties.value !== value) {
                        child.closeSpread();
                    }
                });
            },
            initName() {
                return (this.backupValue += 1);
            },
        };
    }
};
Tabbar = __decorate([
    wxComponent()
], Tabbar);
export default Tabbar;

//# sourceMappingURL=tab-bar.js.map
