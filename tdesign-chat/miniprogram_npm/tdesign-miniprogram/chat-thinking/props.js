/* eslint-disable */
const props = {
    /** 内容区域最大高度，超出会自动滚动 */
    animation: {
        type: String,
        value: 'moving',
    },
    /** 是否折叠 */
    collapsed: {
        type: Boolean,
        value: false,
    },
    /** 思考内容对象 */
    content: {
        type: Object,
        required: true,
    },
    /** 布局方式 */
    layout: {
        type: String,
        value: 'block',
    },
    /** 内容区域最大高度，超出会自动滚动 */
    maxHeight: {
        type: Number,
    },
    /** 思考状态 */
    status: {
        type: String,
        value: 'pending',
        required: true,
    },
};
export default props;

//# sourceMappingURL=props.js.map
