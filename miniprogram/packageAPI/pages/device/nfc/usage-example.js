// iOS NFC Test Function Usage Example
// Demonstrates how to integrate NFC testing functionality in existing pages

Page({
  data: {
    nfcSupported: false,
    nfcStatus: 'Not initialized',
    testResults: []
  },

  onLoad() {
    this.checkNFCSupport();
  },

  // Check NFC support
  checkNFCSupport() {
    try {
      const adapter = wx.getNFCAdapter();
      if (adapter) {
        this.setData({
          nfcSupported: true,
          nfcStatus: 'NFC Supported'
        });
        console.log('Device supports NFC');
      } else {
        this.setData({
          nfcSupported: false,
          nfcStatus: 'NFC Not Supported'
        });
        console.log('Device does not support NFC');
      }
    } catch (error) {
      this.setData({
        nfcSupported: false,
        nfcStatus: 'NFC Initialization Failed'
      });
      console.error('NFC check failed:', error);
    }
  },

  // Navigate to iOS NFC test page
  goToIOSTest() {
    if (!this.data.nfcSupported) {
      wx.showToast({
        title: 'Device does not support NFC',
        icon: 'error'
      });
      return;
    }

    wx.navigateTo({
      url: '/packageAPI/pages/device/nfc/nfc-ios-test',
      success: () => {
        console.log('Successfully navigated to iOS NFC test page');
      },
      fail: (error) => {
        console.error('Navigation failed:', error);
        wx.showToast({
          title: 'Page navigation failed',
          icon: 'error'
        });
      }
    });
  },

  // Quick NFC test
  quickNFCTest() {
    if (!this.data.nfcSupported) {
      wx.showToast({
        title: 'Device does not support NFC',
        icon: 'error'
      });
      return;
    }

    this.addTestResult('Starting quick NFC test...');
    
    const adapter = wx.getNFCAdapter();
    if (!adapter) {
      this.addTestResult('❌ Cannot get NFC adapter');
      return;
    }

    // Set discovery callback
    adapter.onDiscovered((res) => {
      this.addTestResult(`🔍 Device discovered: ${JSON.stringify(res.techs)}`);
      
      // Automatically connect to first supported technology
      if (res.techs && res.techs.length > 0) {
        this.connectToDevice(adapter, res.techs[0]);
      }
    });

    // Start scanning
    adapter.startDiscovery({
      success: () => {
        this.addTestResult('✅ Scan started successfully');
        this.setData({ nfcStatus: 'Scanning...' });
        
        // Auto stop after 10 seconds
        setTimeout(() => {
          adapter.stopDiscovery({
            success: () => {
              this.addTestResult('⏹️ Scan stopped');
              this.setData({ nfcStatus: 'Scan completed' });
            }
          });
        }, 10000);
      },
      fail: (error) => {
        this.addTestResult(`❌ Scan start failed: ${JSON.stringify(error)}`);
      }
    });
  },

  // Connect to device
  connectToDevice(adapter, techType) {
    this.addTestResult(`🔗 Attempting to connect ${techType}...`);
    
    const methodName = this.getTechMethodName(techType);
    if (!methodName || !adapter[methodName]) {
      this.addTestResult(`❌ Unsupported technology: ${techType}`);
      return;
    }

    try {
      const techInstance = adapter[methodName]();
      techInstance.connect({
        success: () => {
          this.addTestResult(`✅ Connection successful: ${techType}`);
          this.performQuickTest(techInstance, techType);
        },
        fail: (error) => {
          this.addTestResult(`❌ Connection failed: ${JSON.stringify(error)}`);
        }
      });
    } catch (error) {
      this.addTestResult(`❌ Connection exception: ${error.message}`);
    }
  },

  // Perform quick test
  performQuickTest(techInstance, techType) {
    this.addTestResult(`🧪 Executing ${techType} test...`);
    
    // Check connection status
    techInstance.isConnected({
      success: (res) => {
        this.addTestResult(`📊 Connection status: ${res.isConnected ? 'Connected' : 'Disconnected'}`);
      }
    });

    // Execute tests based on technology type
    if (techType === 'ndef') {
      this.testNDEF(techInstance);
    } else {
      this.testTransceive(techInstance);
    }
  },

  // Test NDEF
  testNDEF(techInstance) {
    const testMessage = {
      uris: ['https://example.com'],
      texts: ['Hello iOS NFC!']
    };
    
    techInstance.writeNdefMessage({
      ...testMessage,
      success: () => {
        this.addTestResult('✅ NDEF write successful');
      },
      fail: (error) => {
        this.addTestResult(`❌ NDEF write failed: ${JSON.stringify(error)}`);
      }
    });
  },

  // Test data transmission
  testTransceive(techInstance) {
    const testData = new ArrayBuffer(8);
    const view = new Uint8Array(testData);
    view[0] = 0x00; // Test data
    
    techInstance.transceive({
      data: testData,
      success: (res) => {
        this.addTestResult(`✅ Data transmission successful, response length: ${res.data.byteLength}`);
      },
      fail: (error) => {
        this.addTestResult(`❌ Data transmission failed: ${JSON.stringify(error)}`);
      }
    });
  },

  // Get technology method name
  getTechMethodName(tech) {
    const methodMap = {
      'ndef': 'getNdef',
      'isoDep': 'getIsoDep',
      'nfcA': 'getNFCA',
      'nfcB': 'getNFCB',
      'nfcF': 'getNFCF',
      'nfcV': 'getNFCV',
      'mifareClassic': 'getMifareClassic',
      'mifareUltralight': 'getMifareUltralight'
    };
    return methodMap[tech];
  },

  // Add test result
  addTestResult(message) {
    const timestamp = new Date().toLocaleTimeString();
    const result = `[${timestamp}] ${message}`;
    
    this.setData({
      testResults: [...this.data.testResults, result]
    });
    
    console.log(result);
  },

  // Clear test results
  clearTestResults() {
    this.setData({
      testResults: []
    });
  }
}); 