import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-chat-thinking`;
let ChatThinking = class ChatThinking extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            localCollapsed: false,
            contentStyle: '',
            classPrefix: name,
        };
        this.observers = {
            maxHeight() {
                this.setContentStyle();
            },
        };
        this.methods = {
            handleCollapse() {
                // 切换内部折叠状态
                this.setData({
                    localCollapsed: !this.data.localCollapsed,
                });
                // 通知父组件状态变化
                this.triggerEvent('collapsedChange', this.data.localCollapsed);
            },
            setContentStyle() {
                if (this.data.maxHeight) {
                    this.setData({
                        contentStyle: `max-height: ${this.data.maxHeight}px;`,
                    });
                }
                else {
                    this.setData({
                        contentStyle: '',
                    });
                }
            },
        };
        this.lifetimes = {
            created() {
                this.data.handleCollapse = this.handleCollapse.bind(this);
            },
            attached() {
                const createdFn = function __anonymous() {
                    // 初始化折叠状态
                    this.setData({
                        localCollapsed: this.properties.collapsed || false,
                    });
                };
                createdFn.call(this);
                // 调用新增的函数
                this.setContentStyle();
            },
            detached() { },
        };
    }
};
ChatThinking = __decorate([
    wxComponent()
], ChatThinking);
export default ChatThinking;

//# sourceMappingURL=chat-thinking.js.map
