/* eslint-disable */
const props = {
    /** 默认是否展开全部 */
    defaultExpandAll: {
        type: Boolean,
        value: false,
    },
    /** 是否禁用面板展开/收起操作 */
    disabled: {
        type: Boolean,
    },
    /** 展开图标 */
    expandIcon: {
        type: Boolean,
        value: true,
    },
    /** 每个面板互斥展开，每次只展开一个面板 */
    expandMutex: {
        type: Boolean,
        value: false,
    },
    /** 折叠面板风格 */
    theme: {
        type: String,
        value: 'default',
    },
    /** 展开的面板集合 */
    value: {
        type: Array,
        value: null,
    },
    /** 展开的面板集合，非受控属性 */
    defaultValue: {
        type: Array,
        value: [],
    },
};
export default props;

//# sourceMappingURL=props.js.map
