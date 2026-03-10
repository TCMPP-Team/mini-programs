import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-col`;
let Col = class Col extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.relations = {
            '../row/row': {
                type: 'parent',
            },
        };
    }
};
Col = __decorate([
    wxComponent()
], Col);
export default Col;

//# sourceMappingURL=col.js.map
