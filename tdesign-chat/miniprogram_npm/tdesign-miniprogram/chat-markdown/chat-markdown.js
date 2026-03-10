import { __decorate } from "tslib";
import { Lexer } from 'marked';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-chat-markdown`;
let ChatMarkdown = class ChatMarkdown extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            classPrefix: name,
            nodes: [],
            name, // 用于子组件查询父组件时的标识符
        };
        this.observers = {
            // 监听markdown文本变化，自动解析
            content: function (markdown) {
                this.parseMarkdown(markdown);
            },
        };
        this.methods = {
            // 解析markdown文本
            parseMarkdown(markdown) {
                try {
                    const lexer = new Lexer(this.data.options);
                    const tokens = lexer.lex(markdown);
                    this.setData({ nodes: tokens });
                }
                catch (error) {
                    console.error('Markdown parsing error:', error);
                    // 解析失败时，将原始文本作为普通文本显示
                    this.setData({
                        nodes: [
                            {
                                type: 'text',
                                raw: markdown,
                                text: markdown,
                            },
                        ],
                    });
                }
            },
        };
        this.lifetimes = {
            attached() { },
        };
    }
};
ChatMarkdown = __decorate([
    wxComponent()
], ChatMarkdown);
export default ChatMarkdown;

//# sourceMappingURL=chat-markdown.js.map
