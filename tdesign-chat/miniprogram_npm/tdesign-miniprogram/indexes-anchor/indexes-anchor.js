import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-indexes-anchor`;
let IndexesAnchor = class IndexesAnchor extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            anchorStyle: '',
            sticky: false,
            active: false,
        };
        this.relations = {
            '../indexes/indexes': {
                type: 'parent',
            },
        };
    }
};
IndexesAnchor = __decorate([
    wxComponent()
], IndexesAnchor);
export default IndexesAnchor;

//# sourceMappingURL=indexes-anchor.js.map
