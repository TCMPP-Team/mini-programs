/* eslint-disable */
const props = {
    /** markdown 内容文本 */
    content: {
        type: String,
        value: '',
        required: true,
    },
    /** Markdown 解析器基础配置 */
    options: {
        type: Object,
        value: { gfm: true, pedantic: false, breaks: true },
    },
};
export default props;

//# sourceMappingURL=props.js.map
