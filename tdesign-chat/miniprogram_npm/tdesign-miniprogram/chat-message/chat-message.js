import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import props from './props';
import config from '../common/config';
const { prefix } = config;
const name = `${prefix}-chat-message`;
let ChatMessage = class ChatMessage extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            classPrefix: name,
            article: '',
            showAvatar: null,
            showName: null,
            showDateTime: null,
            contentClasses: [],
            chatItemClass: [],
        };
        this.observers = {
            avatar() {
                this.setShowAvatar();
            },
            name() {
                this.setShowName();
            },
            datetime() {
                this.setShowDateTime();
            },
            classPrefix() {
                this.setContentClasses();
            },
            'classPrefix, variant, placement, showDateTime'() {
                this.setChatItemClass();
            },
        };
        this.methods = {
            handleLongPress(e) {
                this.triggerEvent('longpress', {
                    e,
                    id: this.data.chatId,
                });
            },
            setShowAvatar() {
                var _a;
                this.setData({
                    showAvatar: ((_a = this.properties) === null || _a === void 0 ? void 0 : _a.avatar) || '',
                });
            },
            setShowName() {
                var _a;
                this.setData({
                    showName: ((_a = this.properties) === null || _a === void 0 ? void 0 : _a.name) || '',
                });
            },
            setShowDateTime() {
                var _a;
                this.setData({
                    showDateTime: ((_a = this.properties) === null || _a === void 0 ? void 0 : _a.datetime) || '',
                });
            },
            setContentClasses() {
                this.setData({
                    contentClasses: [`${this.data.classPrefix}__content`],
                });
            },
            setChatItemClass() {
                const { classPrefix, showDateTime } = this.data;
                const { variant, role, placement } = this.properties;
                const baseClass = [`${classPrefix}`, `${classPrefix}--${variant}`, role, placement];
                if (showDateTime) {
                    baseClass.push(`${classPrefix}__header`);
                }
                this.setData({
                    chatItemClass: baseClass,
                });
            },
        };
        this.lifetimes = {
            created() {
                this.data.handleLongPress = this.handleLongPress.bind(this);
            },
            attached() {
                this.setShowAvatar();
                this.setShowName();
                this.setShowDateTime();
                this.setContentClasses();
                this.setChatItemClass();
            },
            detached() { },
        };
    }
};
ChatMessage = __decorate([
    wxComponent()
], ChatMessage);
export default ChatMessage;

//# sourceMappingURL=chat-message.js.map
