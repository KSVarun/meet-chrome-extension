function sendMessage(message) {
  chrome.runtime.sendMessage({ todo: message });
}

function setData(data) {
  chrome.storage.sync.set(data);
}

function promisifiedData() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (data) => {
      resolve(data);
    });
  });
}

async function getData() {
  return await promisifiedData();
}

function initiateJoinining() {
  let joined = false;
  if (
    !document.querySelector('.kPEoYc') &&
    document.querySelector('div[jsname=Qx7uuf]')
  ) {
    const joinNowButton = document.querySelector('div[jsname=Qx7uuf]');
    joinNowButton.click();
    joined = true;
  }

  const muteButton = document.querySelectorAll('div[jscontroller=lCGUBd]')[0];
  if (muteButton) {
    const isMuted = muteButton.getAttribute('data-is-muted');
    if (isMuted === 'false') {
      muteButton.click();
    }
  }

  const cancelVideoButton = document.querySelectorAll(
    'div[jscontroller=lCGUBd]'
  )[1];
  if (cancelVideoButton) {
    const isVideoCanceled = cancelVideoButton.getAttribute('data-is-muted');
    if (isVideoCanceled === 'false') {
      cancelVideoButton.click();
    }
  }
  join(joined);
}

function join(joined) {
  setTimeout(() => {
    if (!joined) {
      initiateJoinining(joined);
    }
  }, 2000);
}

function checkLinkExistance(newLink, links) {
  let isPresent = false;
  links.forEach((link) => {
    if (link.link === newLink) {
      isPresent = true;
    }
  });
  return isPresent;
}

async function init() {
  const link = window.location.href;
  sendMessage('showPageAction');
  setData({ link: link });
  const { links } = await getData();
  if (links && checkLinkExistance(link, links)) {
    join(false);
  }
}

init();
