chrome.runtime.sendMessage({ todo: 'showPageAction' });

chrome.storage.sync.set({ link: window.location.href });

chrome.storage.sync.get('links', (data) => {
  if (data.links.includes(window.location.href)) {
    setTimeout(() => {
      if (document.querySelector('div[jsname=Qx7uuf]')) {
        const joinNowButton = document.querySelector('div[jsname=Qx7uuf]');
        joinNowButton.click();
      }

      const muteButton = document.querySelector('div[jscontroller=lCGUBd]');
      if (muteButton) {
        const isMuted = muteButton.getAttribute('data-is-muted');
        if (isMuted === 'false') {
          muteButton.click();
        }
      }
    }, 4000);
  }
});
