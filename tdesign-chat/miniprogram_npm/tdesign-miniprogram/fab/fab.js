import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import useCustomNavbar from '../mixins/using-custom-navbar';
import { unitConvert, systemInfo } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-fab`;
const baseButtonProps = {
    size: 'large',
    shape: 'circle',
    theme: 'primary',
    tClass: `${prefix}-fab__button`,
};
let Fab = class Fab extends SuperComponent {
    constructor() {
        super(...arguments);
        this.behaviors = [useCustomNavbar];
        this.properties = props;
        this.externalClasses = [`class`, `${prefix}-class`, `${prefix}-class-button`];
        this.data = {
            prefix,
            classPrefix: name,
            buttonData: baseButtonProps,
            moveStyle: null,
        };
        this.observers = {
            'buttonProps.**, icon, text, ariaLabel, yBounds'() {
                var _a;
                this.setData({
                    buttonData: Object.assign(Object.assign(Object.assign(Object.assign({}, baseButtonProps), { shape: this.properties.text ? 'round' : 'circle' }), this.properties.buttonProps), { icon: this.properties.icon, content: this.properties.text, ariaLabel: this.properties.ariaLabel }),
                }, (_a = this.computedSize) === null || _a === void 0 ? void 0 : _a.bind(this));
            },
        };
        this.methods = {
            onTplButtonTap(e) {
                this.triggerEvent('click', e);
            },
            onStart(e) {
                this.triggerEvent('dragstart', e.detail.e);
            },
            onMove(e) {
                const { yBounds } = this.properties;
                const { distanceTop } = this.data;
                const { x, y, rect } = e.detail;
                const maxX = systemInfo.windowWidth - rect.width; // 父容器宽度 - 拖动元素宽度
                const maxY = systemInfo.windowHeight - Math.max(distanceTop, unitConvert(yBounds[0])) - rect.height; // 父容器高度 - 拖动元素高度
                const right = Math.max(0, Math.min(x, maxX));
                const bottom = Math.max(0, unitConvert(yBounds[1]), Math.min(y, maxY));
                this.setData({
                    moveStyle: `right: ${right}px; bottom: ${bottom}px;`,
                });
            },
            onEnd(e) {
                this.triggerEvent('dragend', e.detail.e);
            },
            computedSize() {
                var _a, _b;
                if (!this.properties.draggable)
                    return;
                const insChild = this.selectComponent('#draggable');
                // button更新时，重新获取其尺寸
                if ((_b = (_a = this.properties) === null || _a === void 0 ? void 0 : _a.yBounds) === null || _b === void 0 ? void 0 : _b[1]) {
                    this.setData({ moveStyle: `bottom: ${unitConvert(this.properties.yBounds[1])}px` }, insChild.computedRect);
                }
                else {
                    insChild.computedRect();
                }
            },
        };
    }
};
Fab = __decorate([
    wxComponent()
], Fab);
export default Fab;

//# sourceMappingURL=fab.js.map
