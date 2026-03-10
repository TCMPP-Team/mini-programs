import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import props from './props';
import config from '../common/config';
import { setIcon } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-empty`;
let default_1 = class extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-description`, `${prefix}-class-image`];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.observers = {
            icon(icon) {
                const obj = setIcon('icon', icon, '');
                this.setData(Object.assign({}, obj));
            },
        };
    }
};
default_1 = __decorate([
    wxComponent()
], default_1);
export default default_1;

//# sourceMappingURL=empty.js.map
