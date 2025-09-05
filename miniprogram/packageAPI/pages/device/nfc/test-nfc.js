// NFC Function Test Script
// Used to verify basic NFC API functionality

function testNFCBasic() {
  console.log('Starting NFC basic functionality test...');
  
  // Test getting NFC adapter
  try {
    const adapter = wx.getNFCAdapter();
    if (adapter) {
      console.log('✅ NFC adapter obtained successfully');
      console.log('Supported NFC technologies:', Object.keys(adapter.tech));
      
      // Test technology methods
      const techs = Object.keys(adapter.tech);
      techs.forEach(tech => {
        const methodName = getTechMethodName(tech);
        if (adapter[methodName]) {
          console.log(`✅ ${tech} technology method available: ${methodName}`);
        } else {
          console.log(`❌ ${tech} technology method not available: ${methodName}`);
        }
      });
      
      return adapter;
    } else {
      console.log('❌ Device does not support NFC or NFC is not enabled');
      return null;
    }
  } catch (error) {
    console.log('❌ Failed to get NFC adapter:', error);
    return null;
  }
}

function getTechMethodName(tech) {
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
}

function testNFCScanning(adapter) {
  if (!adapter) {
    console.log('❌ Cannot test scanning functionality, adapter is null');
    return;
  }
  
  console.log('Starting NFC scanning functionality test...');
  
  // Set discovery callback
  adapter.onDiscovered((res) => {
    console.log('🔍 NFC device discovered:', res);
  });
  
  // Start scanning
  adapter.startDiscovery({
    success: (res) => {
      console.log('✅ Scan started successfully');
      
      // Stop scanning after 5 seconds
      setTimeout(() => {
        adapter.stopDiscovery({
          success: (res) => {
            console.log('✅ Scan stopped successfully');
          },
          fail: (err) => {
            console.log('❌ Stop scan failed:', err);
          }
        });
      }, 5000);
    },
    fail: (err) => {
      console.log('❌ Start scan failed:', err);
    }
  });
}

// Export test functions
module.exports = {
  testNFCBasic,
  testNFCScanning
};

// If running this script directly
if (typeof wx !== 'undefined') {
  const adapter = testNFCBasic();
  if (adapter) {
    testNFCScanning(adapter);
  }
} 