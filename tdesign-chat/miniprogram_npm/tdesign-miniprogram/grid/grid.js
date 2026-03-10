import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import { isObject } from '../common/validator';
import props from './props';
const { prefix } = config;
const name = `${prefix}-grid`;
let Grid = class Grid extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = ['t-class'];
        this.relations = {
            '../grid-item/grid-item': {
                type: 'descendant',
            },
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            contentStyle: '',
        };
        this.observers = {
            'column,hover,align,gutter,border'() {
                this.updateContentStyle();
                this.doForChild((child) => child.updateStyle());
            },
        };
        this.lifetimes = {
            attached() {
                this.updateContentStyle();
            },
        };
        this.methods = {
            doForChild(action) {
                this.$children.forEach(action);
            },
            updateContentStyle() {
                const contentStyles = [];
                const marginStyle = this.getContentMargin();
                marginStyle && contentStyles.push(marginStyle);
                this.setData({
                    contentStyle: contentStyles.join(';'),
                });
            },
            // 判断需不需要在content上加负margin以实现gutter间距
            getContentMargin() {
                const { gutter } = this.properties;
                let { border } = this.properties;
                if (!border)
                    return `margin-bottom:-${gutter}rpx; margin-right:-${gutter}rpx`;
                if (!isObject(border))
                    border = {};
                const { width = 2 } = border;
                return `margin-bottom:-${width}rpx; margin-right:-${width}rpx`;
            },
        };
    }
};
Grid = __decorate([
    wxComponent()
], Grid);
export default Grid;

//# sourceMappingURL=grid.js.map
