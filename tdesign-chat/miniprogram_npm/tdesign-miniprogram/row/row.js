import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
let Row = class Row extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [];
        this.properties = props;
        this.data = {
            prefix,
        };
        this.relations = {
            '../col/col': {
                type: 'child',
                linked(target) {
                    const { gutter } = this.data;
                    if (gutter) {
                        target.setData({ gutter });
                    }
                },
            },
        };
        this.observers = {
            gutter() {
                this.setGutter();
            },
        };
        this.methods = {
            setGutter() {
                const { gutter } = this.data;
                const cols = this.$children;
                cols.forEach((col) => {
                    col.setData({ gutter });
                });
            },
        };
    }
};
Row = __decorate([
    wxComponent()
], Row);
export default Row;

//# sourceMappingURL=row.js.map
