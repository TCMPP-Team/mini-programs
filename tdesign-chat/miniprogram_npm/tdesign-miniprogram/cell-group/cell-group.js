import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-cell-group`;
let CellGroup = class CellGroup extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-title`];
        this.relations = {
            '../cell/cell': {
                type: 'child',
                linked() {
                    this.updateLastChid();
                },
                unlinked() {
                    this.updateLastChid();
                },
            },
        };
        /**
         * 组件的属性列表
         */
        this.properties = props;
        /**
         * 组件的初始数据
         */
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.methods = {
            updateLastChid() {
                const items = this.$children;
                items.forEach((child, index) => child.setData({ isLastChild: index === items.length - 1 }));
            },
        };
    }
};
CellGroup = __decorate([
    wxComponent()
], CellGroup);
export default CellGroup;

//# sourceMappingURL=cell-group.js.map
