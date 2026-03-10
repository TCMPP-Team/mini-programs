import { __rest } from "tslib";
import { getInstance } from '../common/utils';
function Toast(options) {
    var _a;
    const { context, selector = '#t-toast' } = options, Options = __rest(options, ["context", "selector"]);
    const instance = getInstance(context, selector);
    if (instance) {
        instance.show(Object.assign(Object.assign({}, Options), { duration: (_a = Options.duration) !== null && _a !== void 0 ? _a : 2000 }));
    }
}
function showToast(options = {}) {
    Toast(options);
}
function hideToast(options = {}) {
    const { context, selector = '#t-toast' } = options;
    const instance = getInstance(context, selector);
    if (instance) {
        instance.hide();
    }
}
export { Toast as default, showToast, hideToast };

//# sourceMappingURL=index.js.map
