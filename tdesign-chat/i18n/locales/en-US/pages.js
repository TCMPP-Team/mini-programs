/**
 * English (United States) - Page Texts
 * Page titles and navigation texts
 */

module.exports = {
  home: {
    navTitle: 'TDesign UI',
    shareTitle: 'TDesign UI',
    title: 'TDesign AI Chat Component Demo for WeChat Miniprogram',
    subtitle: 'AI Chat Component Demo',
    description: 'TDesign AI Chat Component Demo for WeChat Miniprogram',
  },

  chatList: {
    title: 'Chat List',
    navTitle: 'Chat',
    subtitle: 'Chat List',
    empty: 'No conversations yet',
    tabs: {
      basic: 'Basic',
      composed: 'Composed',
      custom: 'Custom',
      codeAssistant: 'Code Assistant',
      contentAssistant: 'Content Assistant',
      imageGen: 'Image Generation',
      taskPlan: 'Task Planning',
    },
    codePreview: {
      copyCode: 'Copy Code',
      preview: 'Preview',
    },
  },

  chatMessage: {
    title: 'Chat',
    navTitle: 'ChatItem',
    subtitle: 'Chat Message',
    description: 'Chat message unit',
    headerTitle: 'ChatMessage Message Item',
    headerDesc:
      'Displays a single message in a chat conversation. Supports avatar, name, time, content, multiple statuses, and style variants.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
      desc: 'Basic Type',
      configDesc: 'Configurable name, avatar, and alignment',
      propsDesc: 'Message attributes',
      sampleName: 'Zhang San',
    },
    demo02: {
      title: '02 Component States',
      loadingDesc: 'Loading State',
      errorDesc: 'Error State',
    },
    demo03: {
      title: '03 Component Styles',
      bubbleDesc: 'Bubble Style',
    },
    examples: {
      question: "Does Newton's first law apply to all reference frames?",
    },
  },

  chatSender: {
    title: 'Chat Input',
    navTitle: 'ChatSender',
    subtitle: 'Chat Sender',
    description: 'Chat input component',
    headerTitle: 'ChatSender Chat Input',
    headerDesc: 'Input box for AI chat, extensible to models and multimodal capabilities.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
      desc: 'Basic Type',
    },
    demo02: {
      desc: 'Upload Files',
    },
    demo03: {
      desc: 'Content Citation',
    },
    demo04: {
      desc: 'File Citation',
    },
    theme: {
      filled: 'Filled Button',
      outline: 'Outline Button',
      text: 'Text Button',
    },
    examples: {
      citeText:
        'Newton\'s first law does not apply to all reference frames; it only applies to inertial frames. When a particle is not acted upon by external forces, a reference frame in which the particle remains at rest or moves uniformly in a straight line must be an inertial frame. Therefore, Newton\'s first law is only valid in inertial reference frames.',
      fileCiteName: 'word-file.docx',
    },
  },

  chatMarkdown: {
    title: 'Chat Markdown',
    navTitle: 'ChatMarkdown',
    subtitle: 'Chat Markdown',
    description: 'Chat Markdown rendering',
    headerTitle: 'ChatMarkdown Markdown Content',
    headerDesc:
      'Component for rendering Markdown text in chat scenarios, with built-in marked parser and configuration options.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Basic Markdown Styles',
      desc: 'Headings and Text',
      listDesc: 'List',
    },
    demo02: {
      title: '02 Code Blocks & Tables',
      codeDesc: 'Code Block',
      tableDesc: 'Table',
    },
    demo03: {
      title: '03 Images & Links',
    },
    demo04: {
      title: '04 Blockquote',
    },
  },

  chatContent: {
    title: 'Chat Content',
    navTitle: 'ChatContent',
    subtitle: 'Chat Content',
    description: 'Chat content component',
    headerTitle: 'ChatContent Message Content',
    headerDesc: 'Supports markdown rendering.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
    },
    base: {
      userTextTitle: 'User content plain text supports HTML escaping',
      assistantTextTitle: 'Assistant content (Markdown)',
      userTextSample: 'This is a plain text message from the user.',
    },
  },

  chatThinking: {
    title: 'Thinking Process',
    navTitle: 'ChatThinking',
    subtitle: 'Chat Thinking',
    description: 'Thinking process display',
    headerTitle: 'ChatThinking Thinking Process',
    headerDesc: 'Component for displaying the thinking process.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
      desc: 'Supports multiple loading animations, including gradient, moving, and dots.',
    },
    demo02: {
      title: '02 Component States',
      pendingDesc: 'Thinking',
      completeDesc: 'Thinking Complete',
    },
    demo03: {
      title: '03 Component Styles',
    },
    layout: {
      block: 'Block Style',
      border: 'Border Style',
    },
    examples: {
      thoughtTitle: 'Deep thinking complete (3 seconds)',
      thoughtText:
        "Hmm, the user asks whether Newton's first law applies to all reference frames. First, I should recall what Newton's first law says. It is the law of inertia: if no external force acts on an object, it remains at rest or moves with uniform straight-line motion—i.e., it maintains its original state of motion.",
    },
    typingTitle: 'Thinking Process',
    completedTitle: 'Thinking complete ({{seconds}}s)',
    toastStopped: 'Stopped thinking',
  },

  chatActionbar: {
    title: 'Chat Action Bar',
    navTitle: 'ChatActionbar',
    subtitle: 'Chat Actionbar',
    description: 'Chat action bar component',
    headerTitle: 'ChatActionbar Actions',
    headerDesc:
      'Includes regenerate, like, dislike, and copy buttons. Built-in Clipboard can copy chat content, provides button interaction styles, and listens to actions events for business logic handling.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
      desc: 'Basic Type',
    },
    demo02: {
      title: '02 Component States',
      desc: 'Manual Init State',
    },
  },

  chatLoading: {
    title: 'Loading',
    navTitle: 'ChatLoading',
    subtitle: 'Chat Loading',
    description: 'Loading state display',
    headerTitle: 'ChatLoading Message Loading',
    headerDesc: 'Loading state component for chat scenarios.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
      desc: 'Supports multiple loading animations, including gradient, moving, and dots.',
    },
    demo02: {
      desc: 'With text description',
    },
    text: {
      loading: 'Loading...',
    },
  },

  attachments: {
    title: 'Attachments',
    navTitle: 'Attachments',
    subtitle: 'Attachments',
    description: 'Attachment component',
    fileAttachments: 'Attachments Files',
    componentDesc: 'Component for uploading, previewing, and managing attachments in chat scenarios.',
    notice: 'Rendering framework support: WebView',
    demo01: {
      title: '01 Component Types',
      imageType: 'Image Type',
      fileType: 'File Type',
    },
    demo02: {
      title: '02 Component States',
      imageLoading: 'Image Loading State',
      fileLoading: 'File Loading State',
    },
  },

  navigateFail: {
    errorTitle: 'Failed to load page',
    backHome: 'Back to Home',
  },
};
