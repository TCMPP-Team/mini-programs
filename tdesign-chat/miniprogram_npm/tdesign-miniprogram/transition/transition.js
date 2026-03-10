import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import transition from '../mixins/transition';
import config from '../common/config';
const { prefix } = config;
const name = `${prefix}-transition`;
let Transition = class Transition extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.behaviors = [transition()];
        this.data = {
            classPrefix: name,
        };
    }
};
Transition = __decorate([
    wxComponent()
], Transition);
export default Transition;

//# sourceMappingURL=transition.js.map
