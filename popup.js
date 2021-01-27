currentTab = (callback) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      callback(tabs[0]);
    }
  });
}

getConfig = () => {
  currentTab((tab) => {
    chrome.tabs.sendMessage(tab.id, {method: "getTabConfig"}, (response) => {
      document.getElementById('temporarily-disabled').checked = response.temporarilyDisabled;
    });
  });
};

setConfig = (config) => {
  currentTab((tab) => {
    chrome.tabs.sendMessage(tab.id, {method: "setTabConfig", config});
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getConfig();

  const checkbox = document.getElementById('temporarily-disabled');
  checkbox.addEventListener('change', (e) => {
    setConfig({ temporarilyDisabled: e.currentTarget.checked });
  });
});
