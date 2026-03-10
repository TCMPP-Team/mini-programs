import { SuperComponent, ComponentsOptionsType } from '../../../components/common/src/index';
export default class ChatActionbar extends SuperComponent {
    options: ComponentsOptionsType;
    properties: import("./type").TdChatActionbarProps;
    data: {
        actions: any[];
        classPrefix: string;
        pComment: string;
        iconMap: {
            good: string;
            bad: string;
            replay: string;
            copy: string;
            share: string;
        };
        iconActiveMap: {
            good: string;
            bad: string;
        };
    };
    observers: {
        comment(newVal: any): void;
        'actionBar, pComment'(): void;
    };
    methods: {
        filterSpecialChars(content: string): string;
        handleActionClick(e: any): void;
        handleCopy(): void;
        setActions(): void;
    };
    lifetimes: {
        created(): void;
        attached(): void;
        detached(): void;
    };
}
