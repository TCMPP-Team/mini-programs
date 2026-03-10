import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../../common/src/index';
import config from '../../common/config';
const { prefix } = config;
const name = `${prefix}-chat-markdown-table`;
let ChatMarkdownTable = class ChatMarkdownTable extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = {
            node: {
                type: Object,
                value: {},
            },
        };
        this.data = {
            classPrefix: name,
        };
    }
};
ChatMarkdownTable = __decorate([
    wxComponent()
], ChatMarkdownTable);
export default ChatMarkdownTable;

//# sourceMappingURL=chat-markdown-table.js.map
