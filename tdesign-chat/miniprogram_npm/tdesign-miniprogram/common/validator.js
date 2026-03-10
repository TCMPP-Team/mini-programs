export function isFunction(val) {
    return typeof val === 'function';
}
export const isString = (val) => {
    return typeof val === 'string';
};
export const isNull = (value) => {
    return value === null;
};
export const isUndefined = (value) => value === undefined;
export function isDef(value) {
    return !isUndefined(value) && !isNull(value);
}
export function isNumber(value) {
    return typeof value === 'number' || /^-?\d+(\.\d+)?$/.test(value);
}
export function isBoolean(value) {
    return typeof value === 'boolean';
}
export function isObject(x) {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}
export function isPlainObject(val) {
    return val !== null && typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
}

//# sourceMappingURL=validator.js.map
