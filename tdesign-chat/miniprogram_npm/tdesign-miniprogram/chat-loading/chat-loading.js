import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-chat-loading`;
let ChatLoading = class ChatLoading extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            classPrefix: name,
        };
    }
};
ChatLoading = __decorate([
    wxComponent()
], ChatLoading);
export default ChatLoading;

//# sourceMappingURL=chat-loading.js.map
