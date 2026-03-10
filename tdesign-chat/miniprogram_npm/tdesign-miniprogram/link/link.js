import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-link`;
let Link = class Link extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-hover`,
            `${prefix}-class-prefix-icon`,
            `${prefix}-class-content`,
            `${prefix}-class-suffix-icon`,
        ];
        this.properties = props;
        this.options = {
            multipleSlots: true,
        };
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.observers = {
            'theme, disabled, size, underline, navigatorProps'() {
                this.setClass();
            },
            prefixIcon(v) {
                this.setData({
                    _prefixIcon: calcIcon(v),
                });
            },
            suffixIcon(v) {
                this.setData({
                    _suffixIcon: calcIcon(v),
                });
            },
        };
        this.lifetimes = {
            attached() {
                this.setClass();
            },
        };
        this.methods = {
            setClass() {
                const { theme, size, underline, navigatorProps, disabled } = this.properties;
                const classList = [name, `${name}--${theme}`, `${name}--${size}`];
                const { url, appId, shortLink, target, openType } = navigatorProps !== null && navigatorProps !== void 0 ? navigatorProps : {};
                const condition = !(url || (target === 'miniProgram' && (appId || shortLink)));
                if (underline) {
                    classList.push(`${name}--underline`);
                }
                if ((navigatorProps && condition && !['navigateBack', 'exit'].includes(openType)) || disabled) {
                    classList.push(`${name}--disabled`);
                }
                this.setData({
                    className: classList.join(' '),
                });
            },
            onSuccess(e) {
                this.triggerEvent('success', e);
            },
            onFail(e) {
                this.triggerEvent('fail', e);
            },
            onComplete(e) {
                this.triggerEvent('complete', e);
            },
        };
    }
};
Link = __decorate([
    wxComponent()
], Link);
export default Link;

//# sourceMappingURL=link.js.map
