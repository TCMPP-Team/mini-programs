import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class CellGroup extends SuperComponent {
    externalClasses: string[];
    relations: RelationsOptions;
    /**
     * 组件的属性列表
     */
    properties: import("./type").TdCellGroupProps;
    /**
     * 组件的初始数据
     */
    data: {
        prefix: string;
        classPrefix: string;
    };
    methods: {
        updateLastChid(): void;
    };
}
