import { __rest } from "tslib";
import props from './props';
import { getInstance } from '../common/utils';
const defaultOptions = {
    actions: [],
    buttonLayout: props.buttonLayout.value,
    cancelBtn: props.cancelBtn.value,
    closeOnOverlayClick: props.closeOnOverlayClick.value,
    confirmBtn: props.confirmBtn.value,
    content: '',
    preventScrollThrough: props.preventScrollThrough.value,
    showOverlay: props.showOverlay.value,
    title: '',
    visible: props.visible.value,
};
export default {
    alert(options) {
        const _a = Object.assign({}, options), { context, selector = '#t-dialog' } = _a, otherOptions = __rest(_a, ["context", "selector"]);
        const instance = getInstance(context, selector);
        if (!instance)
            return Promise.reject();
        return new Promise((resolve) => {
            const mergedOptions = Object.assign(Object.assign(Object.assign({}, defaultOptions), instance.properties), otherOptions);
            instance.setData(Object.assign(Object.assign({ cancelBtn: '' }, mergedOptions), { visible: true }));
            instance._onConfirm = resolve;
        });
    },
    confirm(options) {
        const _a = Object.assign({}, options), { context, selector = '#t-dialog' } = _a, otherOptions = __rest(_a, ["context", "selector"]);
        const instance = getInstance(context, selector);
        if (!instance)
            return Promise.reject();
        return new Promise((resolve, reject) => {
            const mergedOptions = Object.assign(Object.assign(Object.assign({}, defaultOptions), instance.properties), otherOptions);
            instance.setData(Object.assign(Object.assign({}, mergedOptions), { visible: true }));
            instance._onConfirm = resolve;
            instance._onCancel = reject;
        });
    },
    close(options) {
        const { context, selector = '#t-dialog' } = Object.assign({}, options);
        const instance = getInstance(context, selector);
        if (instance) {
            instance.close();
            return Promise.resolve();
        }
        return Promise.reject();
    },
    action(options) {
        const _a = Object.assign({}, options), { context, selector = '#t-dialog' } = _a, otherOptions = __rest(_a, ["context", "selector"]);
        const instance = getInstance(context, selector);
        if (!instance)
            return Promise.reject();
        const { buttonLayout = 'vertical', actions = instance.properties.actions } = options;
        const maxLengthSuggestion = buttonLayout === 'vertical' ? 7 : 3;
        if (!actions || (typeof actions === 'object' && (actions.length === 0 || actions.length > maxLengthSuggestion))) {
            console.warn(`action 数量建议控制在1至${maxLengthSuggestion}个`);
        }
        return new Promise((resolve) => {
            const mergedOptions = Object.assign(Object.assign(Object.assign({}, defaultOptions), instance.properties), otherOptions);
            instance.setData(Object.assign(Object.assign({}, mergedOptions), { buttonLayout, visible: true }));
            instance._onAction = resolve;
        });
    },
};

//# sourceMappingURL=index.js.map
