import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { classNames } from '../common/utils';
import { isNumber } from '../common/validator';
const { prefix } = config;
const name = `${prefix}-skeleton`;
const ThemeMap = {
    avatar: [{ type: 'circle', size: '96rpx' }],
    image: [{ type: 'rect', size: '144rpx' }],
    text: [
        [
            { width: '24%', height: '32rpx', marginRight: '32rpx' },
            { width: '76%', height: '32rpx' },
        ],
        1,
    ],
    paragraph: [1, 1, 1, { width: '55%' }],
};
let Skeleton = class Skeleton extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-col`, `${prefix}-class-row`];
        this.properties = props;
        this.timer = undefined;
        this.data = {
            prefix,
            classPrefix: name,
            parsedRowCols: [],
        };
        this.observers = {
            rowCol() {
                this.init();
            },
            'loading, delay'() {
                this.isShowSkeleton();
            },
        };
        this.lifetimes = {
            attached() {
                this.init();
                this.isShowSkeleton();
            },
            detached() {
                this.clearTimer();
            },
        };
        this.methods = {
            init() {
                const { theme, rowCol } = this.properties;
                const rowCols = [];
                if (rowCol.length) {
                    rowCols.push(...rowCol);
                }
                else {
                    rowCols.push(...ThemeMap[theme || 'text']);
                }
                const parsedRowCols = rowCols.map((item) => {
                    if (isNumber(item)) {
                        return new Array(item).fill({
                            class: this.getColItemClass({ type: 'text' }),
                            style: {},
                        });
                    }
                    if (Array.isArray(item)) {
                        return item.map((col) => {
                            return Object.assign(Object.assign({}, col), { class: this.getColItemClass(col), style: this.getColItemStyle(col) });
                        });
                    }
                    const nItem = item;
                    return [
                        Object.assign(Object.assign({}, nItem), { class: this.getColItemClass(nItem), style: this.getColItemStyle(nItem) }),
                    ];
                });
                this.setData({
                    parsedRowCols,
                });
            },
            getColItemClass(obj) {
                return classNames([
                    `${name}__col`,
                    `${name}--type-${obj.type || 'text'}`,
                    `${name}--animation-${this.properties.animation}`,
                ]);
            },
            getColItemStyle(obj) {
                const styleName = [
                    'width',
                    'height',
                    'marginRight',
                    'marginLeft',
                    'margin',
                    'size',
                    'background',
                    'backgroundColor',
                    'borderRadius',
                ];
                const style = {};
                styleName.forEach((name) => {
                    if (name in obj) {
                        const px = isNumber(obj[name]) ? `${obj[name]}px` : obj[name];
                        if (name === 'size') {
                            [style.width, style.height] = [px, px];
                        }
                        else {
                            style[name] = px;
                        }
                    }
                });
                return style;
            },
            clearTimer() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            },
            isShowSkeleton() {
                this.clearTimer();
                const { loading, delay } = this.properties;
                if (!loading || delay === 0) {
                    this.setData({
                        isShow: loading,
                    });
                    return;
                }
                this.timer = setTimeout(() => {
                    this.setData({
                        isShow: this.properties.loading,
                    });
                }, delay);
            },
        };
    }
};
Skeleton = __decorate([
    wxComponent()
], Skeleton);
export default Skeleton;

//# sourceMappingURL=skeleton.js.map
