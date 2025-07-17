import { i18n, lang } from '../../../../i18n/lang'

Page({
  onShareAppMessage() {
    return {
      title: 'iOS NFC Test',
      path: 'packageAPI/pages/device/nfc/nfc-ios-test'
    }
  },

  data: {
    isScanning: false,
    isConnected: false,
    currentDevice: null,
    logMessages: [],
    testData: 'Hello iOS NFC!!!!!',
    currentTech: null,
    writeResult: null
  },

  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

    this.addLog('🚀 iOS NFC Test page loaded');
    this.addLog('📱 This page follows nfc.js pattern');
    this.initNFC();
  },

  // Initialize NFC adapter
  initNFC() {
    this.addLog('Initializing NFC adapter...');
    
    const adapter = wx.getNFCAdapter();
    if (!adapter) {
      this.addLog('❌ Device does not support NFC or NFC is not enabled');
      wx.showToast({
        title: 'Device does not support NFC',
        icon: 'error'
      });
      return;
    }

    this.adapter = adapter;
    this.addLog('✅ NFC adapter initialized successfully');
    
    // Get supported NFC technologies
    const techs = Object.keys(adapter.tech);
    this.setData({
      supportedTechs: techs
    });
    this.addLog(`Supported NFC technologies: ${techs.join(', ')}`);

    // Set discovery callback - following nfc.js pattern
    this.adapter.onDiscovered(this.discovered.bind(this));
  },

  // Device discovery callback - following nfc.js pattern exactly
  discovered(res) {
    console.log('discovered---------------> res', res);
    this.addLog(`🔍 NFC device discovered: ${JSON.stringify(res.techs)}`);
    
    const { techs, messages = [] } = res;
    
    if (techs.length > 0) {
      this.setData({
        currentDevice: res,
        currentTech: techs[0]
      });
      
      this.addLog(`📱 Device technologies: ${techs.join(', ')}`);
      if (messages.length > 0) {
        this.addLog(`📄 Device messages: ${messages.join('; ')}`);
      }
      
      // Following nfc.js pattern - directly handle based on tech type
      if (techs.includes('ndef')) {
        this.addLog('📝 NDEF detected, performing write operation...');
        this.handleNdefWrite();
        return;
      }
      
      if (techs.includes('nfcA')) {
        this.addLog('⚠️ NFC-A detected, but transceive not supported in iOS');
        this.setData({
          writeResult: 'NFC-A operations not supported'
        });
        return;
      }
      
      // Add other tech types as needed
      this.addLog(`⚠️ Unsupported technology: ${techs.join(', ')}`);
    }
  },

  // Handle NDEF write - following nfc.js pattern exactly
  handleNdefWrite() {
    this.addLog('📝 Creating NDEF instance and writing message...');
    
    // Following nfc.js pattern: const ndef = nfc.getNdef()
    const ndef = this.adapter.getNdef();
    
    // Following nfc.js pattern exactly
    ndef.writeNdefMessage({
      uris: ['https://www.tencentcloud.com/zh/products/tcsas'],
      texts: [this.data.testData],
      records: new ArrayBuffer(8), // Binary object array as in nfc.js
      success: (res) => {
        this.addLog(`✅ NDEF write success: ${JSON.stringify(res)}`);
        this.setData({
          writeResult: 'NDEF write successful',
          isConnected: true
        });
        wx.showToast({
          title: 'NDEF write successful',
          icon: 'success'
        });
      },
      fail: (err) => {
        this.addLog(`❌ NDEF write failed: ${JSON.stringify(err)}`);
        this.setData({
          writeResult: 'NDEF write failed',
          isConnected: false
        });
        wx.showToast({
          title: 'NDEF write failed',
          icon: 'error'
        });
      },
      complete: (res) => {
        this.addLog(`📝 NDEF write complete: ${JSON.stringify(res)}`);
      }
    });
  },

  // Start scanning
  startScan() {
    if (!this.adapter) {
      this.addLog('❌ NFC adapter not initialized');
      return;
    }

    this.addLog('🔍 Starting NFC device scan...');
    this.setData({
      isScanning: true,
      isConnected: false,
      currentDevice: null,
      currentTech: null,
      writeResult: null
    });

    this.adapter.startDiscovery({
      success: (res) => {
        this.addLog('✅ Scan started successfully');
        wx.showToast({
          title: 'Scan started',
          icon: 'success'
        });
      },
      fail: (err) => {
        this.addLog(`❌ Scan start failed: ${JSON.stringify(err)}`);
        this.setData({
          isScanning: false
        });
        wx.showToast({
          title: 'Scan start failed',
          icon: 'error'
        });
      }
    });
  },

  // Stop scanning
  stopScan() {
    if (!this.adapter) return;

    this.addLog('⏹️ Stopping scan...');
    this.setData({
      isScanning: false
    });

    this.adapter.stopDiscovery({
      success: (res) => {
        this.addLog('✅ Scan stopped');
        wx.showToast({
          title: 'Scan stopped',
          icon: 'success'
        });
      },
      fail: (err) => {
        this.addLog(`❌ Stop scan failed: ${JSON.stringify(err)}`);
      }
    });
  },

  // Manual data write
  writeData() {
    if (!this.data.currentTech) {
      this.addLog('❌ No technology selected for writing');
      return;
    }

    this.addLog(`📝 Manual data write: ${this.data.testData}`);
    this.handleNdefWrite();
  },

  // Clear logs
  clearLog() {
    this.setData({
      logMessages: []
    });
  },

  // Add log
  addLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    this.setData({
      logMessages: [...this.data.logMessages, logEntry]
    });
    
    console.log(logEntry);
  },

  // Input change
  onInputChange(e) {
    this.setData({
      testData: e.detail.value
    });
  },

  onUnload() {
    // Clean up resources when page unloads
    if (this.adapter) {
      this.adapter.offDiscovered();
      this.adapter.stopDiscovery();
    }
  }
}) 