chrome.runtime.sendMessage({ todo: 'showPageAction' });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if ((request.todo = 'clickJoinNow')) {
    if (document.querySelector('div[jsname=Qx7uuf]')) {
      const joinNowButton = document.querySelector('div[jsname=Qx7uuf]');
      joinNowButton.click();
    }
  }
  if ((request.todo = 'mute&stopVideo')) {
    let mutedOnce = false;
    const data = JSON.parse(localStorage.getItem('muted'));
    if (data) {
      mutedOnce = data.mutedOnce;
    }
    const muteButton = document.querySelector('div[jscontroller=lCGUBd]');

    if (muteButton) {
      const isMuted = muteButton.getAttribute('data-is-muted');
      if (isMuted === 'false' && !data && !mutedOnce) {
        muteButton.click();
        localStorage.setItem('muted', JSON.stringify({ mutedOnce: true }));
      }
    }
  }
});
