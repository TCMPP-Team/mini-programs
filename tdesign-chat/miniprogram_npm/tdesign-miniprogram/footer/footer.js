import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-footer`;
let Footer = class Footer extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
        };
    }
};
Footer = __decorate([
    wxComponent()
], Footer);
export default Footer;

//# sourceMappingURL=footer.js.map
