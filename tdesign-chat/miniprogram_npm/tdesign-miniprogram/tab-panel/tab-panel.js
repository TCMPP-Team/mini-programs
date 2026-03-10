import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import props from './props';
import config from '../common/config';
const { prefix } = config;
const name = `${prefix}-tab-panel`;
let TabPanel = class TabPanel extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.relations = {
            '../tabs/tabs': {
                type: 'ancestor',
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            active: false,
            hide: true,
            id: '',
            hasActivated: false,
        };
        this.observers = {
            'label, badgeProps, disabled, icon, panel, value, lazy'() {
                this.update();
            },
        };
    }
    setId(id) {
        this.setData({ id });
    }
    getComputedName() {
        if (this.properties.value != null) {
            return `${this.properties.value}`;
        }
        return `${this.index}`;
    }
    update() {
        var _a;
        (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.updateTabs();
    }
    render(active, parent) {
        this.initialized = this.initialized || active;
        if (active && !this.data.hasActivated) {
            this.setData({ hasActivated: true });
        }
        this.setData({
            active,
            hide: !parent.data.animation && !active,
        });
    }
};
TabPanel = __decorate([
    wxComponent()
], TabPanel);
export default TabPanel;

//# sourceMappingURL=tab-panel.js.map
