import { __awaiter, __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../../common/src/index';
import config from '../../common/config';
import props from './props';
import { getRect, systemInfo } from '../../common/utils';
const { prefix } = config;
const name = `${prefix}-draggable`;
let Draggable = class Draggable extends SuperComponent {
    constructor() {
        super(...arguments);
        this.properties = props;
        this.externalClasses = [`${prefix}-class`];
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.lifetimes = {
            ready() {
                this.computedRect();
            },
        };
        this.methods = {
            onTouchStart(e) {
                if (this.properties.direction === 'none')
                    return;
                this.startX = e.touches[0].clientX + systemInfo.windowWidth - this.rect.right;
                this.startY = e.touches[0].clientY + systemInfo.windowHeight - this.rect.bottom;
                this.triggerEvent('start', { startX: this.startX, startY: this.startY, rect: this.rect, e });
            },
            onTouchMove(e) {
                if (this.properties.direction === 'none')
                    return;
                let x = this.startX - e.touches[0].clientX; // x轴移动偏移量
                let y = this.startY - e.touches[0].clientY; // y轴移动偏移量
                if (this.properties.direction === 'vertical') {
                    x = systemInfo.windowWidth - this.rect.right;
                }
                if (this.properties.direction === 'horizontal') {
                    y = systemInfo.windowHeight - this.rect.bottom;
                }
                this.triggerEvent('move', { x, y, rect: this.rect, e });
            },
            onTouchEnd(e) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (this.properties.direction === 'none')
                        return;
                    yield this.computedRect();
                    this.triggerEvent('end', { rect: this.rect, e });
                });
            },
            computedRect() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.rect = { right: 0, bottom: 0, width: 0, height: 0 };
                    try {
                        this.rect = yield getRect(this, `.${this.data.classPrefix}`);
                    }
                    catch (e) {
                        // ignore reject
                    }
                });
            },
        };
    }
};
Draggable = __decorate([
    wxComponent()
], Draggable);
export default Draggable;

//# sourceMappingURL=draggable.js.map
