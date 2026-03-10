/* eslint-disable */
const props = {
    /** 是否在点击外部元素后关闭菜单  */
    closeOnClickOutside: {
        type: Boolean,
        value: true,
    },
    /** 确认框内容 */
    content: {
        type: String,
    },
    /** 浮层出现位置 */
    placement: {
        type: String,
        value: 'top',
    },
    /** 是否显示浮层箭头 */
    showArrow: {
        type: Boolean,
        value: true,
    },
    /** 弹出气泡主题 */
    theme: {
        type: String,
        value: 'dark',
    },
    /** 是否显示气泡确认框 */
    visible: {
        type: Boolean,
        value: null,
    },
    /** 是否显示气泡确认框，非受控属性 */
    defaultVisible: {
        type: Boolean,
    },
};
export default props;

//# sourceMappingURL=props.js.map
