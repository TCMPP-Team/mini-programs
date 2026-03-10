import { __awaiter, __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { styles, addUnit, getRect } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-icon`;
let Icon = class Icon extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.data = {
            componentPrefix: prefix,
            classPrefix: name,
            isImage: false,
            iconStyle: undefined,
        };
        this.observers = {
            'name, color, size, style'() {
                this.setIconStyle();
            },
        };
        this.methods = {
            onTap(event) {
                this.triggerEvent('click', event.detail);
            },
            setIconStyle() {
                const { name, color, size, classPrefix } = this.data;
                const isImage = name.indexOf('/') !== -1;
                const sizeValue = addUnit(size);
                const colorStyle = color ? { color: color } : {};
                const fontStyle = size ? { 'font-size': sizeValue } : {};
                const iconStyle = Object.assign(Object.assign({}, colorStyle), fontStyle);
                this.setData({ isImage }, () => __awaiter(this, void 0, void 0, function* () {
                    if (isImage) {
                        let iconSize = sizeValue;
                        if (!iconSize) {
                            yield getRect(this, `.${classPrefix}`)
                                .then((res) => {
                                iconSize = addUnit(res === null || res === void 0 ? void 0 : res.height);
                            })
                                .catch(() => { });
                        }
                        iconStyle.width = iconSize;
                        iconStyle.height = iconSize;
                    }
                    this.setData({ iconStyle: `${styles(iconStyle)}` });
                }));
            },
        };
    }
};
Icon = __decorate([
    wxComponent()
], Icon);
export default Icon;

//# sourceMappingURL=icon.js.map
