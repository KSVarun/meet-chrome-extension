const linkContainer = document.querySelector('.link');
const addButton = document.querySelector('.addBtn');
const helperText = document.querySelector('.helperText');
const addedIcon = document.querySelector('.added');
const notAddedIcon = document.querySelector('.notAdded');
const settingsIcon = document.querySelector('.settings');
const reloadIcon = document.querySelector('.iconRefresh');
const linkName = document.querySelector('.linkName');
const linkNameInput = document.querySelector('.linkNameInput');
const editIcon = document.querySelector('.editIcon');

const monthMap = {
  1: 'Jan',
  2: 'Feb',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

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

function updateStyle() {
  addButton.style.display = 'none';
  helperText.style.display = 'flex';
  addedIcon.style.display = 'block';
  notAddedIcon.style.display = 'none';
}

function getMonth(month) {
  return monthMap[month];
}

function getTime(date) {
  return (
    date.getHours().toString() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes().toString()
  );
}

function getDate() {
  let date = new Date();
  date =
    date.getDate().toString() +
    'th ' +
    getMonth(date.getMonth()) +
    ' ' +
    date.getFullYear() +
    ' ' +
    getTime(date);
  return date;
}

function getNewLink(link) {
  const title =
    linkNameInput.value.length > 0 ? linkNameInput.value : linkName.innerHTML;
  return {
    title: title,
    link: link,
    date: getDate(),
  };
}

function setData(data) {
  chrome.storage.sync.set(data);
}

function addLink(link, links) {
  if (
    links.length &&
    !links.includes(link) &&
    link !== 'https://meet.google.com/'
  ) {
    const newLink = getNewLink(link);
    const updatedLinks = [...links, newLink];
    setData({ links: updatedLinks });
    updateStyle();
  } else {
    const newLink = getNewLink(link);
    const newLinks = [newLink];
    setData({ links: newLinks });
    updateStyle();
  }
}

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}

function reloadPage() {
  window.location.reload();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
  });
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

function editLinkName() {
  const linkNameValue = linkName.innerHTML;
  linkNameInput.value = linkNameValue;
  linkName.style.display = 'none';
  linkNameInput.style.display = 'inline-block';
}

async function init() {
  linkNameInput.style.display = 'none';
  const { link, links } = await getData();
  linkContainer.innerHTML = link;
  linkName.innerHTML = 'Meet';
  if (
    (!links || !checkLinkExistance(link, links)) &&
    link !== 'https://meet.google.com/'
  ) {
    addButton.style.display = 'block';
    notAddedIcon.style.display = 'block';
  } else {
    addedIcon.style.display = 'block';
    linkName.style.display = 'none';
    editIcon.style.display = 'none';
  }

  addButton.addEventListener('click', () => addLink(link, links));
  settingsIcon.addEventListener('click', openOptionsPage);
  reloadIcon.addEventListener('click', reloadPage);
  editIcon.addEventListener('click', editLinkName);
}

init();
