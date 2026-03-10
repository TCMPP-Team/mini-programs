import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import avatarProps from './props';
import { setIcon, systemInfo } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-avatar`;
let Avatar = class Avatar extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-image`,
            `${prefix}-class-icon`,
            `${prefix}-class-alt`,
            `${prefix}-class-content`,
        ];
        this.properties = avatarProps;
        this.data = {
            prefix,
            classPrefix: name,
            isShow: true,
            zIndex: 0,
            windowWidth: systemInfo.windowWidth,
        };
        this.relations = {
            '../avatar-group/avatar-group': {
                type: 'ancestor',
                linked(parent) {
                    this.parent = parent;
                    this.setData({
                        shape: this.data.shape || parent.data.shape || 'circle',
                        size: this.data.size || parent.data.size,
                        bordered: true,
                    });
                },
            },
        };
        this.observers = {
            icon(icon) {
                const obj = setIcon('icon', icon, '');
                this.setData(Object.assign({}, obj));
            },
        };
        this.methods = {
            hide() {
                this.setData({
                    isShow: false,
                });
            },
            onLoadError(e) {
                if (this.properties.hideOnLoadFailed) {
                    this.setData({
                        isShow: false,
                    });
                }
                this.triggerEvent('error', e.detail);
            },
        };
    }
};
Avatar = __decorate([
    wxComponent()
], Avatar);
export default Avatar;

//# sourceMappingURL=avatar.js.map
