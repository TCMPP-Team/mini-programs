import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { getRect } from '../common/utils';
import { getObserver } from '../common/wechat';
let ARRAY = [];
const { prefix } = config;
const name = `${prefix}-swipe-cell`;
const ContainerClass = `.${name}`;
let SwiperCell = class SwiperCell extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.data = {
            prefix,
            wrapperStyle: '',
            closed: true,
            classPrefix: name,
            skipMove: false, // 当触摸方向为纵向时，丢弃move事件，避免阻止下拉刷新等纵向事件
        };
        this.observers = {
            'left, right'() {
                this.setSwipeWidth();
            },
        };
        this.lifetimes = {
            attached() {
                ARRAY.push(this);
            },
            ready() {
                this.setSwipeWidth();
            },
            detached() {
                ARRAY = ARRAY.filter((item) => item !== this);
            },
        };
    }
    setSwipeWidth() {
        Promise.all([getRect(this, `${ContainerClass}__left`), getRect(this, `${ContainerClass}__right`)]).then(([leftRect, rightRect]) => {
            if (leftRect.width === 0 && rightRect.width === 0 && !this._hasObserved) {
                this._hasObserved = true;
                getObserver(this, `.${name}`).then(() => {
                    this.setSwipeWidth();
                });
            }
            this.setData({
                leftWidth: leftRect.width,
                rightWidth: rightRect.width,
            });
        });
    }
    skipMove() {
        if (!this.data.skipMove) {
            this.setData({ skipMove: true });
        }
    }
    catchMove() {
        if (this.data.skipMove) {
            this.setData({ skipMove: false });
        }
    }
    open() {
        this.setData({ opened: true });
    }
    close() {
        this.setData({ opened: false });
    }
    closeOther() {
        ARRAY.filter((item) => item !== this).forEach((item) => item.close());
    }
    onTap() {
        this.close();
    }
    onActionTap(event) {
        const { currentTarget: { dataset: { action }, }, } = event;
        this.triggerEvent('click', action);
    }
};
SwiperCell = __decorate([
    wxComponent()
], SwiperCell);
export default SwiperCell;

//# sourceMappingURL=swipe-cell.js.map
