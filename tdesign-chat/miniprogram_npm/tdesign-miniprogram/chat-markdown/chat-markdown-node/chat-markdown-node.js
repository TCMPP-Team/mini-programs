import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../../common/src/index';
import config from '../../common/config';
const { prefix } = config;
const name = `${prefix}-chat-markdown`;
let ChatMarkdownNode = class ChatMarkdownNode extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = {
            nodes: {
                type: Array,
                value: () => [],
            },
        };
        this.data = {
            classPrefix: name,
        };
        this.methods = {
            linkClick(e) {
                var _a;
                const { index } = e.currentTarget.dataset || {};
                const token = (_a = this.data.nodes) === null || _a === void 0 ? void 0 : _a[index];
                this.handleClick(e, 'link-tap', token);
            },
            getCareMarkdown() {
                if (this.data.careMarkdown) {
                    return this.data.careMarkdown;
                }
                for (this.setData({
                    careMarkdown: this.selectOwnerComponent(),
                }); this.data.careMarkdown.__data__.name !== name; this.setData({
                    careMarkdown: this.data.careMarkdown.selectOwnerComponent(),
                }))
                    ;
                return this.data.careMarkdown;
            },
            handleClick(event, type, token) {
                // 通用点击事件
                this.data.getCareMarkdown().triggerEvent('click', {
                    event,
                    node: token,
                });
            },
        };
        this.lifetimes = {
            created() {
                this.data.getCareMarkdown = this.getCareMarkdown.bind(this);
                this.data.handleClick = this.handleClick.bind(this);
            },
            attached() { },
            detached() { },
        };
    }
};
ChatMarkdownNode = __decorate([
    wxComponent()
], ChatMarkdownNode);
export default ChatMarkdownNode;

//# sourceMappingURL=chat-markdown-node.js.map
