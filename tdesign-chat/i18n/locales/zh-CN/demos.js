/**
 * Chinese (Simplified) - Demo Content
 * 演示页面内容文本
 */

module.exports = {
  // Chat Actionbar 演示
  chatActionbar: {
    pageTitle: 'ChatActionbar 聊天操作栏',
    title: 'ChatActionbar 对话操作',
    desc: '包含重新生成，点赞，点踩，复制按钮。 内置 Clipboard 可以复制聊天内容，提供按钮的交互样式，监听 actions 相关事件由业务层实现具体逻辑。',
    notice: '渲染框架支持情况：WebView',
    copyContent:
      '这是一段可以被复制的内容，支持 Markdown 格式。\n\n**粗体文本**\n*斜体文本*\n\n- 列表项 1\n- 列表项 2',
    demo01: {
      title: '01 组件类型',
      desc: '基础类型',
    },
    demo02: {
      title: '02 组件状态',
      desc: '手动初始化状态',
    },
  },

  // Chat Content 演示
  chatContent: {
    pageTitle: 'ChatContent 对话正文',
    title: 'ChatContent 对话正文',
    desc: '支持 markdown 格式的渲染。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
    },
    userContent: '用户内容纯文本支持HTML转义',
    assistantContent: '助手内容（Markdown）',
    userText: '这是用户发送的普通文本内容',
  },

  // Chat Loading 演示
  chatLoading: {
    pageTitle: 'ChatLoading 聊天加载状态',
    title: 'ChatLoading 对话加载',
    desc: '用于对话场景中的加载状态组件。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '支持多种加载中动效类型，包括 gradient、moving、dots',
    },
    demo02: {
      desc: '带文案描述的类型',
    },
    text: '加载中...',
    types: {
      moving: '正在理解中...',
      gradient: '深度思考中...',
      circle: '加载中...',
    },
  },

  // Chat Markdown 演示
  chatMarkdown: {
    pageTitle: 'ChatMarkdown 聊天 Markdown 渲染器',
    title: 'ChatMarkdown Markdown内容',
    desc: '用于聊天场景中渲染 Markdown 格式文本的组件，内置 marked 解析器，支持多种 Markdown 语法和配置选项。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 基础 Markdown 样式',
      titleDesc: '标题与文本',
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
    samples: {
      base: `# Markdown 功能测试 (H1 标题)

## 基础语法测试 (H2 标题)

### 列表测试

- 无序列表项 1
- 无序列表项 2
    - 缩进列表项 1（4 个空格缩进）
    - 缩进列表项 2（4 个空格缩进）

1. 有序列表项 1
2. 有序列表项 2
    1. 缩进有序列表项 1（4 个空格缩进）
    2. 缩进有序列表项 2（4 个空格缩进）

### 代码块测试

\`\`\`javascript
// JavaScript 代码块
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('Markdown');
\`\`\`

### 其他元素

> 引用文本块
> 多行引用内容

**加粗文字** _斜体文字_ ~~删除线~~

这是一个链接 [TDesign](https://tdesign.tencent.com)。
`,
      list: `- 列表项 A\n- 列表项 B\n    - 子项 B.1\n    - 子项 B.2\n`,
      code: `\`\`\`js\nconsole.log('Hello, Markdown!');\n\`\`\`\n`,
      sheet: `| 列1 | 列2 |\n| --- | --- |\n| A | B |\n| C | D |\n`,
      url: `这是一个链接：[TDesign](https://tdesign.tencent.com)\n`,
      refer: `> 这里是一段引用内容\n`,
    },
  },

  // Chat Message 演示
  chatMessage: {
    pageTitle: 'ChatItem',
    title: 'ChatMessage 对话消息体',
    desc: '用于在聊天对话中显示单个消息项。它可以展示用户的头像、昵称、时间、聊天内容，支持多种消息状态和样式变体。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      baseDesc: '基础类型',
      configDesc: '可配置昵称、头像、对齐方式',
      attrDesc: '配置消息属性',
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
    userName: '张三',
    errorMessage: '´• •`!!!请求出错',
    prompts: {
      adPlan: '分析以下内容，总结一篇广告策划方案',
      analyze: '分析以下',
    },
  },

  // Chat Sender 演示
  chatSender: {
    pageTitle: 'ChatSender 对话输入框',
    title: 'ChatSender 对话输入',
    desc: '用于 AI 聊天的输入框，可以扩展模型、多模态等能力。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      baseDesc: '基础类型',
      uploadDesc: '上传文件',
      contentDesc: '内容引用',
      fileDesc: '文件引用',
    },
    heightLimit: '高度限制：最大高度为132px',
    deepThink: '深度思考',
    aiGenerated: '内容由AI生成，仅供参考',
    sampleFile1: '图片1.png',
    sampleFile2: '文档.pdf',
    newFile: '新文件{{count}}.txt',
  },

  // Chat Thinking 演示
  chatThinking: {
    pageTitle: 'ChatThinking 聊天思考状态',
    title: 'ChatThinking 思考过程',
    desc: '用于展示思考过程的组件。',
    notice: '渲染框架支持情况：WebView',
    demo01: {
      title: '01 组件类型',
      desc: '支持多种加载动效类型，包括gradient、moving、dots',
    },
    demo02: {
      title: '02 组件状态',
      thinkingDesc: '思考中',
      completeDesc: '思考完成',
    },
    demo03: {
      title: '03 组件样式',
      desc: '',
    },
    text: '嗯，用户问牛顿第一定律是不是适用于所有参考系。这是个经典的物理问题，涉及惯性参考系的概念。我需要解释清楚，牛顿第一定律只在惯性参考系中成立。非惯性参考系需要引入惯性力。',
    title: '思考中···',
    thinkingProcess: '思考过程',
    completed: '已完成思考（耗时{{duration}}秒）',
    completedFixed: '已深度思考(用时19秒)',
    stopped: '已停止思考',
    reset: '已重置',
  },

  // Chat List 演示
  chatList: {
    tabs: {
      base: '基础使用',
      compose: '组合式用法',
      custom: '自定义',
      writer: '文案助手',
      image: '图像生成',
      task: '任务规划',
    },
  },

  // Attachments 演示
  attachments: {
    clicked: '点击了{{name}}',
    deleteSuccess: '删除成功',
    addClicked: '点击了添加按钮',
    fileDeleteSuccess: '文件删除成功',
    filesSelected: '选择了{{count}}个文件',
    unavailable: '暂不可操作',
  },

  // 引用内容
  citations: {
    physics: '牛顿第一定律并不适用于所有参考系。它只适用于惯性参考系，即相对于绝对空间静止或匀速直线运动的参考系。在惯性参考系中，如果一个物体不受外力作用，它将保持静止状态或匀速直线运动状态。',
    wordFile: 'word文件.docx',
  },

  // 思考内容详细
  thinkingContent: {
    title: '已完成思考（耗时3秒）',
    text: '好的，我现在需要回答用户关于对比近3年当代偶像爱情剧并总结创作经验的问题\n查询网络信息中...\n根据网络搜索结果，成功案例包括《春色寄情人》《要久久爱》《你也有今天》等，但缺乏具体播放数据，需要结合行业报告总结共同特征。2022-2024年偶像爱情剧的创作经验主要集中在题材创新、现实元素融入、快节奏叙事等方面。结合行业报告和成功案例，总结出以下创作经验。',
  },
};
