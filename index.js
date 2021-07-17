function promisifiedGetLink() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('link', (data) => {
      resolve(data.link);
    });
  });
}

function promisifiedGetLinks() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('links', (data) => {
      resolve(data.links);
    });
  });
}

async function getLink() {
  return await promisifiedGetLink();
}

async function getAllLinks() {
  return await promisifiedGetLinks();
}

function addLink(link, links) {
  if (
    links.length &&
    !links.includes(link) &&
    link !== 'https://meet.google.com/'
  ) {
    const updatedLinks = [...links, link];
    chrome.storage.sync.set({ links: updatedLinks });
  } else {
    const newLinks = [link];
    chrome.storage.sync.set({ links: newLinks });
  }
}

async function init() {
  const link = await getLink();
  const links = await getAllLinks();
  const linkContainer = document.querySelector('#link');
  const addButton = document.querySelector('#add');
  linkContainer.innerHTML = link;
  if (!links.length || !links.includes(link)) {
    addButton.style.opacity = '1';
  }

  addButton.addEventListener('click', () => addLink(link, links));
}

init();
