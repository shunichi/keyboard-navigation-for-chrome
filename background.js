chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.method === 'getConfig') {
    sendResponse({
      "search":localStorage["search"],
      "hitahint":localStorage["hitahint"],
      "other":localStorage["other"],
      "hitahintkeys": localStorage["hitahintkeys"],
      "sites":localStorage["disabled_sites"],
    });
  }
});
