const linkContainer = document.querySelector('.linksContainer');
const noLinkContainer = document.querySelector('.noLinksTitle');
const savedLinksTitle = document.querySelector('.title');

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

function setData(data) {
  chrome.storage.sync.set(data);
}

function removeLink(linkToBeRemoved, links) {
  const updatedLinks = links.filter((link) => link !== linkToBeRemoved);
  setData({ links: updatedLinks });
  window.location.reload();
}

function addLinksToLinksContainer(links) {
  links.forEach((link) => {
    const linkElement = document.createElement('div');
    const removeButton = document.createElement('button');
    const linkTitle = document.createElement('div');
    const linkName = document.createElement('div');
    const linkDate = document.createElement('div');
    linkElement.className = 'link';
    removeButton.className = 'removeBtn';
    linkTitle.className = 'linkTitle';
    linkName.className = 'linkName';
    linkDate.className = 'linkDate';

    linkName.innerHTML = link.title;
    linkDate.innerHTML = link.date;
    linkTitle.innerHTML = link.link;
    removeButton.innerHTML = 'REMOVE';
    linkElement.appendChild(linkName);
    linkElement.appendChild(linkDate);
    linkElement.appendChild(linkTitle);
    linkElement.appendChild(removeButton);
    linkContainer.appendChild(linkElement);

    removeButton.addEventListener('click', () => removeLink(link, links));
  });
}

async function init() {
  const { links } = await getData();
  if (links && links.length > 0) {
    noLinkContainer.style.display = 'none';
    addLinksToLinksContainer(links);
  } else {
    savedLinksTitle.style.display = 'none';
  }
}

init();
