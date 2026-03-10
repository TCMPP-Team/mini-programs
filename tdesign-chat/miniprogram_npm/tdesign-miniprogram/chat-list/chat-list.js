import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-chat-list`;
let Chat = class Chat extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = Object.assign(Object.assign({}, props), { virtualList: {
                type: Boolean,
                value: false,
            }, fragmentLen: {
                type: Number,
                value: 8,
            } });
        this.data = {
            classPrefix: name,
            scrollViewTop: 0,
            classes: [],
            listClasses: [],
            startIndex: 0,
            endIndex: 0,
        };
        this.observers = {
            data() {
                const dataLen = this.properties.data.length;
                if (this.properties.virtualList && this.oldDataLen !== dataLen) {
                    this.oldDataLen = dataLen;
                    this.resetFragments();
                }
            },
        };
        this.methods = {
            setScrollTop(scrollTop = 0) {
                if (scrollTop === this.data.scrollViewTop) {
                    // eslint-disable-next-line no-param-reassign
                    scrollTop -= 1;
                }
                this.setData({
                    scrollViewTop: scrollTop,
                });
            },
            scrollToBottom() {
                this.setScrollTop();
            },
            onScroll(e) {
                this.triggerEvent('scroll', e);
            },
            handlerScrollToUpper() {
                if (!this.properties.reverse && this.properties.virtualList) {
                    this.addFragment();
                }
            },
            handlerScrollToLower() {
                if (this.properties.reverse && this.properties.virtualList) {
                    this.addFragment();
                }
            },
            resetFragments() {
                const dataLen = this.properties.data.length;
                if (dataLen) {
                    const { fragmentLen } = this.properties;
                    if (this.properties.reverse) {
                        this.setData({
                            startIndex: 0,
                            endIndex: Math.min(dataLen - 1, fragmentLen - 1),
                        });
                    }
                    else {
                        this.setData({
                            startIndex: Math.max(dataLen - fragmentLen, 0),
                            endIndex: Math.max(dataLen - 1, 0),
                        });
                    }
                }
            },
            addFragment(count = 4) {
                const dataLen = this.properties.data.length;
                if (dataLen) {
                    if (this.properties.reverse) {
                        this.setData({
                            endIndex: Math.min(dataLen - 1, this.data.endIndex + count),
                        });
                    }
                    else {
                        this.setData({
                            startIndex: Math.max(this.data.startIndex - count, 0),
                        });
                        // todo 正向布局自动滚动到原来位置？
                    }
                }
            },
        };
        this.lifetimes = {
            created() {
                this.data.setScrollTop = this.setScrollTop.bind(this);
                this.data.scrollToBottom = this.scrollToBottom.bind(this);
            },
        };
    }
};
Chat = __decorate([
    wxComponent()
], Chat);
export default Chat;

//# sourceMappingURL=chat-list.js.map
