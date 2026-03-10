import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { getBackgroundColor } from './utils';
import { unitConvert, isIOS as isIOSValidator } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-progress`;
let Progress = class Progress extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-bar`, `${prefix}-class-label`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            colorBar: '',
            heightBar: '',
            computedStatus: '',
            computedProgress: 0,
            isIOS: false,
        };
        this.observers = {
            percentage(percentage) {
                percentage = Math.max(0, Math.min(percentage, 100));
                this.setData({
                    computedStatus: percentage === 100 ? 'success' : '',
                    computedProgress: percentage,
                });
            },
            color(color) {
                this.setData({
                    colorBar: getBackgroundColor(color),
                    colorCircle: typeof color === 'object' ? '' : color, // 环形不支持渐变，单独处理
                });
            },
            strokeWidth(strokeWidth) {
                if (!strokeWidth) {
                    return '';
                }
                this.setData({
                    heightBar: unitConvert(strokeWidth),
                });
            },
            trackColor(trackColor) {
                this.setData({
                    bgColorBar: trackColor,
                });
            },
        };
    }
    attached() {
        const isIOS = isIOSValidator();
        this.setData({
            isIOS,
        });
    }
};
Progress = __decorate([
    wxComponent()
], Progress);
export default Progress;

//# sourceMappingURL=progress.js.map
