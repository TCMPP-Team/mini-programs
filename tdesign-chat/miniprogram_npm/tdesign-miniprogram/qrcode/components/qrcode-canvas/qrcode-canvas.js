import { __awaiter, __decorate } from "tslib";
import props from './props';
import useQRCode from '../../hooks/useQRCode';
import { SuperComponent, wxComponent } from '../../../common/src/index';
import { DEFAULT_MINVERSION, excavateModules } from '../../../common/shared/qrcode/utils';
let QRCode = class QRCode extends SuperComponent {
    constructor() {
        super(...arguments);
        this.properties = props;
        this.lifetimes = {
            ready() {
                this.checkDefaultValue();
                this.initCanvas();
            },
        };
        this.observers = {
            '**': function () {
                this.checkDefaultValue();
                this.initCanvas();
            },
        };
        this.methods = {
            initCanvas() {
                return __awaiter(this, void 0, void 0, function* () {
                    const query = wx.createSelectorQuery().in(this);
                    query
                        .select('#qrcodeCanvas')
                        .fields({ node: true, size: true })
                        .exec((res) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        if (!((_a = res[0]) === null || _a === void 0 ? void 0 : _a.node)) {
                            return;
                        }
                        const canvas = res[0].node;
                        const ctx = canvas.getContext('2d');
                        yield this.drawQrcode(canvas, ctx);
                    }));
                });
            },
            drawQrcode(canvas, ctx) {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    if (!ctx)
                        return;
                    const { value, icon, size, iconSize, level, bgColor, color, includeMargin, marginSize } = this
                        .properties;
                    const sizeProp = this.getSizeProp(iconSize);
                    try {
                        const qrData = useQRCode({
                            value,
                            level: level,
                            minVersion: DEFAULT_MINVERSION,
                            includeMargin: includeMargin,
                            marginSize: marginSize,
                            size: size,
                            imageSettings: icon
                                ? {
                                    src: icon,
                                    width: sizeProp.width,
                                    height: sizeProp.height,
                                    excavate: true,
                                }
                                : undefined,
                        });
                        const windowInfo = wx.getWindowInfo();
                        const dpr = windowInfo.pixelRatio || 1;
                        canvas.width = size * dpr;
                        canvas.height = size * dpr;
                        const scale = (size * dpr) / qrData.numCells;
                        ctx.scale(scale, scale);
                        ctx.fillStyle = bgColor;
                        ctx.fillRect(0, 0, qrData.numCells, qrData.numCells);
                        let cellsToDraw = qrData.cells;
                        if (icon && ((_a = qrData.calculatedImageSettings) === null || _a === void 0 ? void 0 : _a.excavation)) {
                            cellsToDraw = excavateModules(qrData.cells, qrData.calculatedImageSettings.excavation);
                        }
                        ctx.fillStyle = color;
                        cellsToDraw.forEach((row, y) => {
                            row.forEach((cell, x) => {
                                if (cell) {
                                    ctx.fillRect(x + qrData.margin, y + qrData.margin, 1.05, 1.05); // 略微大于 1 是抗锯齿处理
                                }
                            });
                        });
                        if (icon && qrData.calculatedImageSettings) {
                            const img = canvas.createImage();
                            yield new Promise((resolve, reject) => {
                                img.onload = resolve;
                                img.onerror = reject;
                                img.src = this.properties.icon;
                            });
                            ctx.drawImage(img, qrData.calculatedImageSettings.x + qrData.margin, qrData.calculatedImageSettings.y + qrData.margin, qrData.calculatedImageSettings.w, qrData.calculatedImageSettings.h);
                        }
                        this.triggerEvent('drawCompleted');
                    }
                    catch (err) {
                        this.triggerEvent('drawError', { error: err });
                    }
                });
            },
            getSizeProp(iconSize) {
                if (!iconSize)
                    return { width: 0, height: 0 };
                if (typeof iconSize === 'number') {
                    return {
                        width: iconSize,
                        height: iconSize,
                    };
                }
                return {
                    width: iconSize.width,
                    height: iconSize.height,
                };
            },
            checkDefaultValue() {
                const updates = { bgColor: '', color: '' };
                let changeFlag = false;
                const { bgColor, color } = this.properties;
                const { bgColor: defBg, color: defCol } = props;
                if (bgColor === '' && defBg.value) {
                    updates.bgColor = defBg.value;
                    changeFlag = true;
                }
                if (color === '' && defCol.value) {
                    updates.color = defCol.value;
                    changeFlag = true;
                }
                changeFlag && this.setData(updates);
            },
            // 暴露 canvas 节点给父组件
            getCanvasNode() {
                return new Promise((resolve) => {
                    const query = wx.createSelectorQuery().in(this);
                    query
                        .select('#qrcodeCanvas')
                        .fields({ node: true, size: true })
                        .exec((res) => {
                        var _a;
                        resolve((_a = res[0]) === null || _a === void 0 ? void 0 : _a.node);
                    });
                });
            },
        };
    }
};
QRCode = __decorate([
    wxComponent()
], QRCode);
export default QRCode;

//# sourceMappingURL=qrcode-canvas.js.map
