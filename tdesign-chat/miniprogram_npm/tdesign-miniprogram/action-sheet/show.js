import { __rest } from "tslib";
import { getInstance } from '../common/utils';
export var ActionSheetTheme;
(function (ActionSheetTheme) {
    ActionSheetTheme["List"] = "list";
    ActionSheetTheme["Grid"] = "grid";
})(ActionSheetTheme || (ActionSheetTheme = {}));
export const show = function (options) {
    const _a = Object.assign({}, options), { context, selector = '#t-action-sheet' } = _a, otherOptions = __rest(_a, ["context", "selector"]);
    const instance = getInstance(context, selector);
    if (instance) {
        instance.show(Object.assign({}, otherOptions));
        return instance;
    }
    console.error('未找到组件,请确认 selector && context 是否正确');
};
export const close = function (options) {
    const { context, selector = '#t-action-sheet' } = Object.assign({}, options);
    const instance = getInstance(context, selector);
    if (instance) {
        instance.close();
    }
};

//# sourceMappingURL=show.js.map
