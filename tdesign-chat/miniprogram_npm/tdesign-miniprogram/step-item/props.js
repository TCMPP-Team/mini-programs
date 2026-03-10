/* eslint-disable */
const props = {
    /** 步骤描述 */
    content: {
        type: String,
        value: '',
    },
    /** 步骤条自定义内容 */
    extra: {
        type: String,
    },
    /** 图标。传入 slot 代表使用插槽，其他字符串代表使用内置图标 */
    icon: {
        type: String,
    },
    /** 当前步骤的状态：默认状态（未开始）、进行中状态、完成状态、错误状态 */
    status: {
        type: String,
        value: 'default',
    },
    /** 标题 */
    title: {
        type: String,
        value: '',
    },
};
export default props;

//# sourceMappingURL=props.js.map
