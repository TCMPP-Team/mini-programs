import { __decorate } from "tslib";
import props from './props';
import config from '../../../common/config';
import { SuperComponent, wxComponent } from '../../../common/src/index';
const { prefix } = config;
const name = `${prefix}-qrcode`;
let QRCode = class QRCode extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = Object.assign(Object.assign({}, props), { statusRender: {
                type: Boolean,
                value: false,
            } });
        this.data = {
            prefix,
            classPrefix: name,
            isSkyline: false,
        };
        this.lifetimes = {
            attached() {
                this.setData({
                    isSkyline: this.renderer === 'skyline',
                });
            },
        };
        this.methods = {
            handleRefresh() {
                this.triggerEvent('refresh');
            },
        };
    }
};
QRCode = __decorate([
    wxComponent()
], QRCode);
export default QRCode;

//# sourceMappingURL=qrcode-status.js.map
