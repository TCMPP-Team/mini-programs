import { __decorate } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-collapse`;
let Collapse = class Collapse extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.relations = {
            '../collapse-panel/collapse-panel': {
                type: 'descendant',
            },
        };
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.observers = {
            'value, expandMutex '() {
                this.updateExpanded();
            },
        };
        this.methods = {
            updateExpanded() {
                this.$children.forEach((child) => {
                    child.updateExpanded(this.properties.value);
                });
            },
            switch(panelValue) {
                const { expandMutex, value: activeValues } = this.properties;
                let value = [];
                const hit = activeValues.indexOf(panelValue);
                if (hit > -1) {
                    value = activeValues.filter((item) => item !== panelValue);
                }
                else {
                    value = expandMutex ? [panelValue] : activeValues.concat(panelValue);
                }
                this._trigger('change', { value });
            },
        };
    }
};
Collapse = __decorate([
    wxComponent()
], Collapse);
export default Collapse;

//# sourceMappingURL=collapse.js.map
