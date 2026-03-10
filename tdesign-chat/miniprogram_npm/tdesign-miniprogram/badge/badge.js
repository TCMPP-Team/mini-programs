import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { uniqueFactory } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-badge`;
const getUniqueID = uniqueFactory('badge');
let Badge = class Badge extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-count`, `${prefix}-class-content`];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            value: '',
            labelID: '',
            descriptionID: '',
        };
        this.lifetimes = {
            ready() {
                const uniqueID = getUniqueID();
                this.setData({
                    labelID: `${uniqueID}_label`,
                    descriptionID: `${uniqueID}_description`,
                });
            },
        };
    }
};
Badge = __decorate([
    wxComponent()
], Badge);
export default Badge;

//# sourceMappingURL=badge.js.map
