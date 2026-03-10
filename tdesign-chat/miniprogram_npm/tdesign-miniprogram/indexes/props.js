/* eslint-disable */
const props = {
    /** 索引列表的激活项，默认首项 */
    current: {
        type: null,
        value: null,
    },
    /** 索引列表的激活项，默认首项，非受控属性 */
    defaultCurrent: {
        type: null,
    },
    /** 索引字符列表。不传默认 `A-Z` */
    indexList: {
        type: Array,
    },
    /** 索引是否吸顶，默认为true */
    sticky: {
        type: Boolean,
        value: true,
    },
    /** 锚点吸顶时与顶部的距离	 */
    stickyOffset: {
        type: Number,
        value: 0,
    },
};
export default props;

//# sourceMappingURL=props.js.map
