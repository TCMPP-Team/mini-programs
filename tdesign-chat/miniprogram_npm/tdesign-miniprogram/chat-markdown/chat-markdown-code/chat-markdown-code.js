import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../../common/src/index';
import config from '../../common/config';
const { prefix } = config;
const name = `${prefix}-chat-markdown-code`;
let ChatMarkdownCode = class ChatMarkdownCode extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = {
            node: {
                type: Object,
                value: () => ({}),
            },
        };
        this.data = {
            classPrefix: name,
        };
    }
};
ChatMarkdownCode = __decorate([
    wxComponent()
], ChatMarkdownCode);
export default ChatMarkdownCode;

//# sourceMappingURL=chat-markdown-code.js.map
