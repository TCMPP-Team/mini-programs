/**
 * English (United States) - Chat Texts
 * Chat-related texts
 */

module.exports = {
  message: {
    placeholder: 'Type a message...',
    sendPlaceholder: 'Enter message content',
    emptyMessage: 'Message cannot be empty',
    user: 'User',
    assistant: 'Assistant',
    system: 'System',
  },

  actionbar: {
    regenerate: 'Regenerate',
    copy: 'Copy',
    like: 'Like',
    dislike: 'Dislike',
    share: 'Share',
    copyContent: 'Copy content',
  },

  thinking: {
    title: 'Thinking...',
    titleShort: 'Thinking',
    analyzing: 'Analyzing...',
    processing: 'Processing...',
    complete: 'Thinking complete',
  },

  loading: {
    title: 'Loading...',
    pleaseWait: 'Please wait...',
  },

  markdown: {
    supportNote: 'Supports Markdown format rendering.',
    renderFramework: 'Rendering framework support:',
    webview: 'WebView',
  },

  example: {
    content: 'This is content that can be copied, supporting Markdown format.\n\n**Bold text**\n*Italic text*\n\n- List item 1\n- List item 2',
    question1: 'Does Newton\'s first law apply to all reference frames?',
    question2: 'Please help me plan a birthday party for a 5-year-old child',
    question3: 'What is the name of the ATM in Antarctica?',
    question4: 'Based on the provided materials, write an article recommending spring outdoor picnic destinations in Xiaohongshu style',
    question5: 'Please design three brand promotional images for TDesign',
    answer: 'The ATM in Antarctica doesn\'t have a specific dedicated name, but historically there was indeed an ATM that briefly existed at **McMurdo Station** in Antarctica...',
    answer2: 'It\'s called McMurdo Station ATM, an automated teller machine installed by Wells Fargo at McMurdo Station, the largest scientific center in Antarctica.',
    answer3: 'No, Newton\'s first law does not apply to all reference frames. It only applies to inertial reference frames.',
    atmQuestion: 'What is the name of the ATM in Antarctica?',
    atmAnswer: 'It\'s often referred to as the McMurdo Station ATM (historic).',
    atmThinkingPart1: 'The user is asking about the name of an ATM in Antarctica. It\'s a bit unusual because Antarctica has very limited commercial infrastructure.\n',
    atmThinkingPart2: '\n\nHistorically, an ATM operated briefly at **McMurdo Station** (installed in 1998, later removed). There is no widely-used official name beyond that context.',
    welcome: {
      agent: 'Welcome to TDesign Agent Family Activity Planning Assistant. Please give me your task!',
      chart: 'Welcome to TDesign Smart Chart Analysis Assistant. Please enter your question',
      writer: 'Welcome to TDesign Copywriting Assistant. You can upload reference files and enter your writing topic~',
      image: 'Welcome to TDesign Smart Image Generation Assistant. Write down your creative ideas and try uploading reference images~',
    },
    generating: 'Next, I will generate images that meet the requirements',
  },

  agent: {
    planIntro: 'Let me break this down into a simple, actionable plan:',
    planPhases: '3 phases: prep → event → follow-up',
    step1: {
      title: 'Food & drinks',
      command: 'Search kid-friendly menu ideas',
      result: 'Pick 1 main + 2 snacks + 1 dessert; avoid allergens.',
    },
  },

  docs: {
    mockResponse: '🌼Hey friends, spring is here! These outdoor picnic destinations you must know👏\n\n🌟Suburban Park\nHere you can find vast lawns and various flowers, every shot looks like a masterpiece📷. You can also fly kites, have picnics, and enjoy the leisurely spring time.\n\n🌳Botanical Garden\nVarious rare plants gather here, as if you are in a green ocean. Walk through it and feel the magic and beauty of nature.\n\n💧Lakeside Wetland\nThe lake is clear, with excellent surrounding ecology. You can see many migratory birds and aquatic plants, a great place to get close to nature.\n\nFriends, pack your bags and check in at these places😜.\n\n#SpringOuting #CheckInDestinations #OutdoorJourney #SpringScenery',
    toast: {
      regenerate: 'Regenerate',
      copySuccess: 'Copy successful',
      likeSuccess: 'Liked successfully',
      unlikeSuccess: 'Unliked',
      dislikeSuccess: 'Disliked successfully',
      undislikeSuccess: 'Undisliked',
      share: 'Share',
      defaultAction: 'Performed {name} action',
    },
    console: {
      stopSending: 'Stop sending',
      inputFocus: 'Input focused',
      uploadPanelStatus: 'Upload panel display status:',
      contentHeightExpression: 'Content area height CSS expression:',
      generateContentHeightFailed: 'Failed to generate content height expression:',
    },
  },
};
