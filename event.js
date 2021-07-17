const mutedOnce = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == 'showPageAction') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});

function startSetInterval() {
  setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'clickJoinNow' });
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'mute&stopVideo' });
    });
  }, 1000);
}
startSetInterval();
