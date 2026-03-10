import i18n from '../../../utils/i18n';

const chat = {
    name: i18n.t('pages.home.subtitle'),
    icon: 'chat',
    childArr: [ 
        {
            name: 'ChatList',
            label: i18n.t('pages.chatList.title'),
        },
        {
            name: 'ChatMessage',
            label: i18n.t('pages.chatMessage.description'),
        },
        {
            name: 'ChatSender',
            label: i18n.t('pages.chatSender.title'),
        },
        {
            name: 'ChatMarkdown',
            label: i18n.t('pages.chatMarkdown.title'),
        },
        {
            name: 'ChatContent',
            label: i18n.t('pages.chatContent.title'),
        },
        {
            name: 'ChatThinking',
            label: i18n.t('pages.chatThinking.title'),
        },
        {
            name: 'Attachments',
            label: '',
        },
        {
            name: 'ChatActionbar',
            label: i18n.t('pages.chatActionbar.title'),
        },
        {
            name: 'ChatLoading',
            label: i18n.t('pages.chatLoading.title'),
        },
    ],
};
const skylineChat = {};
export { chat, skylineChat };

//# sourceMappingURL=chat.js.map
