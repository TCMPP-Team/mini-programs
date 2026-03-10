import { __decorate } from "tslib";
import { wxComponent, SuperComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-steps`;
let Steps = class Steps extends SuperComponent {
    constructor() {
        super(...arguments);
        this.relations = {
            '../step-item/step-item': {
                type: 'child',
                linked(child) {
                    this.updateChildren();
                    const { readonly } = this.data;
                    child.setData({
                        readonly,
                    });
                },
                unlinked() {
                    this.updateLastChid();
                },
            },
        };
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.controlledProps = [
            {
                key: 'current',
                event: 'change',
            },
        ];
        // 组件的内部数据
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.observers = {
            'current, theme, sequence'() {
                this.updateChildren();
            },
        };
        this.methods = {
            updateChildren() {
                const items = this.$children;
                items.forEach((item, index) => {
                    item.updateStatus(Object.assign({ index, items }, this.data));
                });
            },
            updateLastChid() {
                const items = this.$children;
                items.forEach((child, index) => child.setData({ isLastChild: index === items.length - 1 }));
            },
            handleClick(index) {
                if (!this.data.readonly) {
                    const preIndex = this.data.current;
                    this._trigger('change', {
                        previous: preIndex,
                        current: index,
                    });
                }
            },
        };
    }
};
Steps = __decorate([
    wxComponent()
], Steps);
export default Steps;

//# sourceMappingURL=steps.js.map
