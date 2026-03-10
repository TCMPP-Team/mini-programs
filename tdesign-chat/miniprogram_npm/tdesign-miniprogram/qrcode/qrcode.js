import { __awaiter, __decorate } from "tslib";
import props from './props';
import config from '../common/config';
import { SuperComponent, wxComponent } from '../common/src/index';
const { prefix } = config;
const name = `${prefix}-qrcode`;
let QRCode = class QRCode extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-canvas`];
        this.options = {
            multipleSlots: true,
            virtualHost: true,
        };
        this.properties = Object.assign(Object.assign({}, props), { statusRender: {
                type: Boolean,
                value: false,
            }, style: {
                type: String,
                value: '',
            }, customStyle: {
                type: String,
                value: '',
            } });
        this.data = {
            prefix,
            showMask: false,
            classPrefix: name,
            canvasReady: false,
        };
        this.lifetimes = {
            ready() {
                return __awaiter(this, void 0, void 0, function* () {
                    const canvasComp = this.selectComponent('#qrcodeCanvas'); // 获取 canvas 示例
                    const canvas = yield canvasComp.getCanvasNode();
                    this.setData({ canvasNode: canvas });
                });
            },
            attached() {
                this.setData({
                    showMask: this.properties.status !== 'active',
                });
            },
        };
        this.observers = {
            status: function (newVal) {
                this.setData({
                    showMask: newVal !== 'active',
                });
            },
        };
        this.methods = {
            handleDrawCompleted() {
                this.setData({
                    canvasReady: true,
                });
            },
            handleDrawError(err) {
                console.error('二维码绘制失败', err);
            },
            handleRefresh() {
                this.triggerEvent('refresh');
            },
            // 二维码下载方法
            handleDownload() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!this.data.canvasNode) {
                        console.error('未找到 canvas 节点');
                        return;
                    }
                    wx.canvasToTempFilePath({
                        canvas: this.data.canvasNode,
                        success: (res) => {
                            wx.saveImageToPhotosAlbum({ filePath: res.tempFilePath });
                        },
                        fail: (err) => {
                            console.error('canvasToTempFilePath failed', err);
                        },
                    }, this);
                });
            },
        };
    }
};
QRCode = __decorate([
    wxComponent()
], QRCode);
export default QRCode;

//# sourceMappingURL=qrcode.js.map
