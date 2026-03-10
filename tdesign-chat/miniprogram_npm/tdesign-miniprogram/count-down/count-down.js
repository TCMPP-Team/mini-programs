import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { isSameSecond, parseFormat, parseTimeData, TimeDataUnit } from './utils';
const { prefix } = config;
const name = `${prefix}-count-down`;
let CountDown = class CountDown extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-count`, `${prefix}-class-split`];
        this.properties = props;
        this.observers = {
            time() {
                this.reset();
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            timeDataUnit: TimeDataUnit,
            timeData: parseTimeData(0),
            formattedTime: '0',
        };
        this.timeoutId = null;
        this.isInitialTime = false;
        this.lifetimes = {
            detached() {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
            },
        };
        this.methods = {
            start() {
                if (this.counting) {
                    return;
                }
                this.counting = true;
                this.endTime = Date.now() + this.remain;
                this.doCount();
            },
            pause() {
                this.counting = false;
                this.timeoutId && clearTimeout(this.timeoutId);
            },
            reset() {
                this.pause();
                this.remain = this.properties.time;
                this.updateTime(this.remain);
                if (this.properties.autoStart && this.remain > 0) {
                    this.start();
                }
                this.isInitialTime = true;
            },
            getTime() {
                return Math.max(this.endTime - Date.now(), 0);
            },
            updateTime(remain) {
                const { format } = this.properties;
                this.remain = remain;
                const timeData = parseTimeData(remain);
                this.triggerEvent('change', timeData);
                const { timeText } = parseFormat(remain, format);
                const timeRange = format.split(':');
                this.setData({
                    timeRange,
                    timeData,
                    formattedTime: timeText.replace(/:/g, ' : '),
                });
                if (remain === 0 && (this.counting || this.isInitialTime)) {
                    this.pause();
                    this.triggerEvent('finish');
                    this.counting = false;
                }
            },
            doCount() {
                this.timeoutId = setTimeout(() => {
                    const time = this.getTime();
                    if (this.properties.millisecond) {
                        this.updateTime(time);
                    }
                    else if (!isSameSecond(time, this.remain) || time === 0) {
                        this.updateTime(time);
                    }
                    if (time !== 0) {
                        this.doCount();
                    }
                }, 33); // 30 帧，因此 1000 / 30 = 33
            },
        };
    }
};
CountDown = __decorate([
    wxComponent()
], CountDown);
export default CountDown;

//# sourceMappingURL=count-down.js.map
