import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import { isDef } from '../common/validator';
import config from '../common/config';
import { getTreeDepth } from '../common/utils';
import props from './props';
const { prefix } = config;
const name = `${prefix}-tree-select`;
let TreeSelect = class TreeSelect extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-left-column`,
            `${prefix}-class-left-item`,
            `${prefix}-class-middle-item`,
            `${prefix}-class-right-column`,
            `${prefix}-class-right-item`,
            `${prefix}-class-right-item-label`,
        ];
        this.options = {
            multipleSlots: true,
        };
        this.data = {
            prefix,
            classPrefix: name,
            scrollIntoView: null,
        };
        this.properties = props;
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            'value, customValue, options, keys, multiple'() {
                this.buildTreeOptions();
            },
        };
        this.lifetimes = {
            ready() {
                this.getScrollIntoView('init');
            },
        };
        this.methods = {
            buildTreeOptions() {
                var _a, _b;
                const { options, value, customValue, multiple, keys } = this.data;
                if (!options.length)
                    return;
                const treeOptions = [];
                let level = -1;
                let currentNode = { children: options };
                while (currentNode === null || currentNode === void 0 ? void 0 : currentNode.children) {
                    level += 1;
                    const currentLevelOptions = currentNode.children.map((item) => ({
                        label: item[(keys === null || keys === void 0 ? void 0 : keys.label) || 'label'],
                        value: item[(keys === null || keys === void 0 ? void 0 : keys.value) || 'value'],
                        disabled: item[(keys === null || keys === void 0 ? void 0 : keys.disabled) || 'disabled'],
                        children: item[(keys === null || keys === void 0 ? void 0 : keys.children) || 'children'],
                    }));
                    treeOptions.push(currentLevelOptions);
                    const currentValue = (_a = customValue === null || customValue === void 0 ? void 0 : customValue[level]) !== null && _a !== void 0 ? _a : value === null || value === void 0 ? void 0 : value[level];
                    currentNode = currentValue
                        ? (_b = currentLevelOptions.find((child) => child.value === currentValue)) !== null && _b !== void 0 ? _b : currentLevelOptions[0]
                        : currentLevelOptions[0];
                }
                const depth = getTreeDepth(options, keys === null || keys === void 0 ? void 0 : keys.children);
                // 补齐 treeOptions 长度到 depth
                while (treeOptions.length < depth) {
                    treeOptions.push([]);
                    level += 1;
                }
                const leafLevel = Math.max(0, level);
                const innerValue = customValue ||
                    treeOptions.map((levelOptions, idx) => {
                        var _a, _b, _c;
                        const isLastLevel = idx === treeOptions.length - 1;
                        const defaultValue = isLastLevel && multiple ? [(_a = levelOptions[0]) === null || _a === void 0 ? void 0 : _a.value] : (_b = levelOptions[0]) === null || _b === void 0 ? void 0 : _b.value;
                        return (_c = value === null || value === void 0 ? void 0 : value[idx]) !== null && _c !== void 0 ? _c : defaultValue;
                    });
                this.setData({
                    innerValue,
                    leafLevel,
                    treeOptions,
                });
            },
            getScrollIntoView(status) {
                const { value, customValue, scrollIntoView } = this.data;
                if (status === 'init') {
                    const _value = customValue || value;
                    const scrollIntoView = Array.isArray(_value)
                        ? _value.map((item) => {
                            return Array.isArray(item) ? item[0] : item;
                        })
                        : [_value];
                    this.setData({
                        scrollIntoView,
                    });
                }
                else {
                    if (scrollIntoView === null)
                        return;
                    this.setData({
                        scrollIntoView: null,
                    });
                }
            },
            onRootChange(e) {
                const { innerValue } = this.data;
                const { value: itemValue } = e.detail;
                this.getScrollIntoView('none');
                innerValue[0] = itemValue;
                this._trigger('change', { value: innerValue, level: 0 });
            },
            handleTreeClick(e) {
                const { level, value: itemValue } = e.currentTarget.dataset;
                const { innerValue } = this.data;
                innerValue[level] = itemValue;
                this.getScrollIntoView('none');
                this._trigger('change', { value: innerValue, level: 1 });
            },
            handleChange(e) {
                const { innerValue } = this.data;
                const { level, type } = e.target.dataset;
                const { value } = type === 'multiple' ? e.detail.context : e.detail;
                if (type === 'multiple') {
                    if (!isDef(innerValue[level])) {
                        innerValue[level] = [];
                    }
                    const index = innerValue[level].indexOf(value);
                    index === -1 ? innerValue[level].push(value) : innerValue[level].splice(index, 1);
                }
                else {
                    innerValue[level] = value;
                }
                this.getScrollIntoView('none');
                this._trigger('change', { value: innerValue, level });
            },
        };
    }
};
TreeSelect = __decorate([
    wxComponent()
], TreeSelect);
export default TreeSelect;

//# sourceMappingURL=tree-select.js.map
