import { __decorate } from "tslib";
import { wxComponent, SuperComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-steps-item`;
let StepItem = class StepItem extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.relations = {
            '../steps/steps': {
                type: 'parent',
            },
        };
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-content`,
            `${prefix}-class-title`,
            `${prefix}-class-description`,
            `${prefix}-class-extra`,
        ];
        this.properties = props;
        this.data = {
            classPrefix: name,
            prefix,
            index: 0,
            isDot: false,
            curStatus: '',
            layout: 'vertical',
            isLastChild: false,
            sequence: 'positive',
        };
        this.observers = {
            status(value) {
                const { curStatus } = this.data;
                if (curStatus === '' || value === curStatus)
                    return;
                this.setData({ curStatus: value });
            },
        };
        this.methods = {
            updateStatus({ current, currentStatus, index, theme, layout, items, sequence }) {
                let curStatus = this.data.status;
                if (curStatus === 'default') {
                    if (index < Number(current)) {
                        curStatus = 'finish';
                    }
                    else if (index === Number(current)) {
                        curStatus = currentStatus;
                    }
                }
                this.setData({
                    curStatus,
                    index,
                    isDot: theme === 'dot',
                    layout,
                    theme,
                    sequence,
                    isLastChild: index === (sequence === 'positive' ? items.length - 1 : 0),
                });
            },
            onTap() {
                this.$parent.handleClick(this.data.index);
            },
        };
    }
};
StepItem = __decorate([
    wxComponent()
], StepItem);
export default StepItem;

//# sourceMappingURL=step-item.js.map
