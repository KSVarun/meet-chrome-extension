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

function initiateJoinining(audio, video) {
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
    if (isMuted === 'false' && audio) {
      muteButton.click();
    }
  }

  const cancelVideoButton = document.querySelectorAll(
    'div[jscontroller=lCGUBd]'
  )[1];
  if (cancelVideoButton) {
    const isVideoCanceled = cancelVideoButton.getAttribute('data-is-muted');
    if (isVideoCanceled === 'false' && video) {
      cancelVideoButton.click();
    }
  }
  join(joined, audio, video);
}

function join(joined, audio, video) {
  setTimeout(() => {
    if (!joined) {
      initiateJoinining(audio, video);
    }
  }, 2000);
}

function getLinkData(newLink, links) {
  let isPresent = false;
  let audio = true;
  let video = true;
  links.some((link) => {
    if (link.link === newLink) {
      isPresent = true;
      audio = link.audio;
      video = link.video;
    }
  });
  return { isPresent, audio, video };
}

async function init() {
  const link = window.location.href;
  sendMessage('showPageAction');
  setData({ link: link });
  const { links } = await getData();
  const { isPresent, audio, video } = getLinkData(link, links);
  if (links && isPresent) {
    join(false, audio, video);
  }
}

init();
