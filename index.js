const linkContainer = document.querySelector('.link');
const addButton = document.querySelector('.addBtn');
const helperText = document.querySelector('.helperText');
const addedIcon = document.querySelector('.added');
const notAddedIcon = document.querySelector('.notAdded');

function promisifiedData() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (data) => {
      resolve(data);
    });
  });
}

async function getData() {
  return await promisifiedData();
}

function updateStyle() {
  addButton.style.display = 'none';
  helperText.style.display = 'block';
  addedIcon.style.display = 'block';
  notAddedIcon.style.display = 'none';
}

function addLink(link, links) {
  if (
    links.length &&
    !links.includes(link) &&
    link !== 'https://meet.google.com/'
  ) {
    const updatedLinks = [...links, link];
    chrome.storage.sync.set({ links: updatedLinks });
    updateStyle();
  } else {
    const newLinks = [link];
    chrome.storage.sync.set({ links: newLinks });
    updateStyle();
  }
}

async function init() {
  const { link, links } = await getData();
  linkContainer.innerHTML = link;
  if (
    (!links.length || !links.includes(link)) &&
    link !== 'https://meet.google.com/'
  ) {
    addButton.style.display = 'block';
    notAddedIcon.style.display = 'block';
  } else {
    addedIcon.style.display = 'block';
  }

  addButton.addEventListener('click', () => addLink(link, links));
}

init();
