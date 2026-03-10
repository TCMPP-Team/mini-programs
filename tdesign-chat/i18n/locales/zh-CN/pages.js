/**
 * Chinese (Simplified) - Page Texts
 * 页面标题和导航文本
 */

module.exports = {
  home: {
    navTitle: 'TDesign UI',
    shareTitle: 'TDesign UI',
    title: 'TDesign 适配微信小程序的 AI Chat 组件演示',
    subtitle: 'AI Chat 对话组件演示',
    description: 'TDesign 适配微信小程序的 AI Chat 组件演示',
  },

  chatList: {
    title: '对话列表',
    navTitle: 'Chat',
    subtitle: 'Chat List',
    empty: '暂无对话',
    tabs: {
      basic: '基础使用',
      composed: '组合式用法',
      custom: '自定义',
      codeAssistant: '代码助手',
      contentAssistant: '文案助手',
      imageGen: '图像生成',
      taskPlan: '任务规划',
    },
    codePreview: {
      copyCode: '复制代码',
      preview: '预览',
    },
  },

  chatMessage: {
    title: '对话',
    navTitle: 'ChatItem',
    subtitle: 'Chat Message',
    description: '对话单元',
    headerTitle: 'ChatMessage 对话消息体',
    headerDesc: '用于在聊天对话中显示单个消息项。它可以展示用户的头像、昵称、时间、聊天内容，支持多种消息状态和样式变体。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '基础类型',
      configDesc: '可配置昵称、头像、对齐方式',
      propsDesc: '配置消息属性',
      sampleName: '张三',
    },
    demo02: {
      title: '02 组件状态',
      loadingDesc: '加载状态',
      errorDesc: '出错状态',
    },
    demo03: {
      title: '03 组件样式',
      bubbleDesc: '气泡样式',
    },
    examples: {
      question: '牛顿第一定律是否适用于所有参考系？',
    },
  },

  chatSender: {
    title: '对话输入框',
    navTitle: 'ChatSender',
    subtitle: 'Chat Sender',
    description: '对话输入框组件',
    headerTitle: 'ChatSender 对话输入',
    headerDesc: '用于 AI 聊天的输入框，可以扩展模型、多模态等能力。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '基础类型',
    },
    demo02: {
      desc: '上传文件',
    },
    demo03: {
      desc: '内容引用',
    },
    demo04: {
      desc: '文件引用',
    },
    theme: {
      filled: '填充按钮',
      outline: '描边按钮',
      text: '文字按钮',
    },
    examples: {
      citeText:
        '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。',
      fileCiteName: 'word文件.docx',
    },
  },

  chatMarkdown: {
    title: '对话 Markdown',
    navTitle: 'ChatMarkdown',
    subtitle: 'Chat Markdown',
    description: '对话 Markdown 渲染',
    headerTitle: 'ChatMarkdown Markdown内容',
    headerDesc: '用于聊天场景中渲染 Markdown 格式文本的组件，内置 marked 解析器，支持多种 Markdown 语法和配置选项。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 基础 Markdown 样式',
      desc: '标题与文本',
      listDesc: '列表',
    },
    demo02: {
      title: '02 代码块与表格',
      codeDesc: '代码块',
      tableDesc: '表格',
    },
    demo03: {
      title: '03 图片与超链接',
    },
    demo04: {
      title: '04 引用',
    },
  },

  chatContent: {
    title: '对话正文',
    navTitle: 'ChatContent',
    subtitle: 'Chat Content',
    description: '对话正文组件',
    headerTitle: 'ChatContent 对话正文',
    headerDesc: '支持 markdown 格式的渲染。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
    },
    base: {
      userTextTitle: '用户内容纯文本支持HTML转义',
      assistantTextTitle: '助手内容（Markdown）',
      userTextSample: '这是用户发送的普通文本内容',
    },
  },

  chatThinking: {
    title: '思考过程',
    navTitle: 'ChatThinking',
    subtitle: 'Chat Thinking',
    description: '思考过程展示',
    headerTitle: 'ChatThinking 思考过程',
    headerDesc: '用于展示思考过程的组件。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '支持多种加载动效类型，包括gradient、moving、dots',
    },
    demo02: {
      title: '02 组件状态',
      pendingDesc: '思考中',
      completeDesc: '思考完成',
    },
    demo03: {
      title: '03 组件样式',
    },
    layout: {
      block: 'block 样式',
      border: 'border 样式',
    },
    examples: {
      thoughtTitle: '已深度思考(用时19秒)',
      thoughtText:
        '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说， 保持原来的运动状态。',
    },
    typingTitle: '思考过程',
    completedTitle: '已完成思考（耗时{{seconds}}秒）',
    toastStopped: '已停止思考',
  },

  chatActionbar: {
    title: '对话操作栏',
    navTitle: 'ChatActionbar',
    subtitle: 'Chat Actionbar',
    description: '对话操作栏组件',
    headerTitle: 'ChatActionbar 对话操作',
    headerDesc:
      '包含重新生成，点赞，点踩，复制按钮。内置 Clipboard 可以复制聊天内容，提供按钮的交互样式，监听 actions 相关事件由业务层实现具体逻辑。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '基础类型',
    },
    demo02: {
      title: '02 组件状态',
      desc: '手动初始化状态',
    },
  },

  chatLoading: {
    title: '加载中',
    navTitle: 'ChatLoading',
    subtitle: 'Chat Loading',
    description: '加载状态展示',
    headerTitle: 'ChatLoading 对话加载',
    headerDesc: '用于对话场景中的加载状态组件。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '支持多种加载中动效类型，包括 gradient、moving、dots',
    },
    demo02: {
      desc: '带文案描述的类型',
    },
    text: {
      loading: '加载中...',
    },
  },

  attachments: {
    title: '附件',
    navTitle: 'Attachments',
    subtitle: 'Attachments',
    description: '附件组件',
    fileAttachments: 'Attachments 聊天附件',
    componentDesc: '用于聊天场景中上传、预览和管理附件的组件。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      imageType: '图片类型',
      fileType: '文件类型',
    },
    demo02: {
      title: '02 组件状态',
      imageLoading: '图片类型加载状态',
      fileLoading: '文件类型加载状态',
    },
  },

  navigateFail: {
    errorTitle: '页面加载错误',
    backHome: '回到首页',
  },
};
