/**
 * Chinese (Simplified) - Chat Texts
 * 对话相关文本
 */

module.exports = {
  message: {
    placeholder: '请输入消息...',
    sendPlaceholder: '请输入消息内容',
    emptyMessage: '消息不能为空',
    user: '用户',
    assistant: '助手',
    system: '系统',
  },

  actionbar: {
    regenerate: '重新生成',
    copy: '复制',
    like: '点赞',
    dislike: '点踩',
    share: '分享功能',
    copyContent: '复制内容',
  },

  thinking: {
    title: '思考中...',
    titleShort: '思考中',
    analyzing: '正在分析...',
    processing: '正在处理...',
    complete: '思考完成',
  },

  loading: {
    title: '加载中...',
    pleaseWait: '请稍候...',
  },

  markdown: {
    supportNote: '支持 markdown 格式的渲染。',
    renderFramework: '渲染框架支持情况:',
    webview: 'WebView',
  },

  example: {
    content: '这是一段可以被复制的内容,支持markdown格式。\n\n**粗体文本**\n*斜体文本*\n\n- 列表项1\n- 列表项2',
    question1: '牛顿第一定律是否适用于所有参考系?',
    question2: '请帮我做一个5岁儿童生日聚会的规划',
    question3: '南极的自动提款机叫什么名字',
    question4: '根据所提供的材料总结一篇文章，推荐春天户外郊游打卡目的地，需要符合小红书平台写作风格',
    question5: '请为Tdesign设计三张品牌宣传图',
    answer: '南极的自动提款机并没有一个特定的专属名称,但历史上确实有一台ATM机曾短暂存在于南极的**麦克默多站**(McMurdo Station)...',
    answer2: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
    answer3: '不，牛顿第一定律并不适用于所有参考系。它只适用于惯性参考系。',
    atmQuestion: '南极的自动提款机叫什么名字？',
    atmAnswer: '通常被称为 McMurdo Station ATM（历史上的）。',
    atmThinkingPart1: '用户询问的是南极洲ATM机的名称。这有点不寻常，因为南极洲的商业基础设施非常有限。\n',
    atmThinkingPart2: '\n\n从历史上看，麦克默多站（McMurdo Station）曾短暂运营过一台ATM（1998年安装，后来移除）。除此之外，并没有广泛使用的官方名称。',
    welcome: {
      agent: '欢迎使用TDesign Agent家庭活动策划助手，请给我布置任务吧～',
      chart: '欢迎使用TDesign智能图表分析助手，请输入你的问题',
      writer: '欢迎使用TDesign文案写作助手，可以先上传你需要参考的文件，输入你要撰写的主题~',
      image: '欢迎使用TDesign智能生图助手，请先写下你的创意，可以试试上传参考图哦～',
    },
    generating: '接下来我将生成符合要求的图片',
  },

  agent: {
    planIntro: '让我为你制定一个简单可行的计划：',
    planPhases: '3个阶段：准备 → 活动 → 收尾',
    step1: {
      title: '食物和饮品',
      command: '搜索适合儿童的菜单创意',
      result: '选择1个主菜 + 2个小吃 + 1个甜点；避免过敏原。',
    },
  },

  docs: {
    mockResponse: '🌼宝子们，春天来啦，这些户外郊游打卡地你必须知道👏\n\n🌟郊野公园\n这里有大片的草地和各种花卉，随便一拍都是大片既视感📷。还能放风筝、野餐，享受惬意的春日时光。\n\n🌳植物园\n各种珍稀植物汇聚于此，仿佛置身于绿色的海洋。漫步其中，感受大自然的神奇与美丽。\n\n💧湖边湿地\n湖水清澈，周围生态环境优越。能看到很多候鸟和水生植物，是亲近自然的好去处。\n\n宝子们，赶紧收拾行囊，去这些地方打卡吧😜。\n\n#春天郊游 #打卡目的地 #户外之旅 #春日美景',
    toast: {
      regenerate: '重新生成',
      copySuccess: '复制成功',
      likeSuccess: '点赞成功',
      unlikeSuccess: '取消点赞',
      dislikeSuccess: '点踩成功',
      undislikeSuccess: '取消点踩',
      share: '分享功能',
      defaultAction: '执行了{name}操作',
    },
    console: {
      stopSending: '停止发送',
      inputFocus: '输入框聚焦',
      uploadPanelStatus: '上传面板显示状态:',
      contentHeightExpression: '内容区域高度CSS表达式:',
      generateContentHeightFailed: '生成内容高度表达式失败:',
    },
  },
};
