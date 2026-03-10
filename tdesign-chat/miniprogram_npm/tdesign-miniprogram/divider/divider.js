import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-divider`;
let Divider = class Divider extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
        this.options = {
            multipleSlots: true,
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
        this.observers = {
            lineColor() {
                this.setStyle();
            },
        };
        this.methods = {
            setStyle() {
                const { lineColor } = this.properties;
                const dividerStyle = `${lineColor ? `border-color: ${lineColor};` : ''}`;
                this.setData({
                    dividerStyle,
                });
            },
        };
    }
};
Divider = __decorate([
    wxComponent()
], Divider);
export default Divider;

//# sourceMappingURL=divider.js.map
