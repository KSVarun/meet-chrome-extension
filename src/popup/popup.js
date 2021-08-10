import { getData, setData, getDate, getLinkFromStorage } from '../../utils.js';
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
const audioCheckbox = document.querySelector('#audioCheckbox');
const videoCheckbox = document.querySelector('#videoCheckbox');
const options = document.querySelector('.options');

function updateStyle() {
  addButton.style.display = 'none';
  helperText.style.display = 'flex';
  addedIcon.style.display = 'block';
  notAddedIcon.style.display = 'none';
  editIcon.style.display = 'none';
}

function getNewLink(link) {
  const title =
    linkNameInput.value.length > 0 ? linkNameInput.value : linkName.innerHTML;
  const audio = audioCheckbox.checked;
  const video = videoCheckbox.checked;
  return {
    title,
    link,
    date: getDate(),
    audio,
    video,
  };
}

function addLink(link, links) {
  if (links && !links.includes(link) && link !== 'https://meet.google.com/') {
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

function editLinkName() {
  const linkNameValue = linkName.innerHTML;
  linkNameInput.value = linkNameValue;
  linkName.style.display = 'none';
  linkNameInput.style.display = 'inline-block';
  linkNameInput.focus();
}

async function init() {
  linkNameInput.style.display = 'none';
  const { link, links } = await getData();
  linkContainer.innerHTML = link;
  linkName.innerHTML = 'Untitled Meet';
  const savedLinkData = getLinkFromStorage(link, links);
  if (savedLinkData.length === 0 && link !== 'https://meet.google.com/') {
    addButton.style.display = 'block';
    notAddedIcon.style.display = 'block';
  } else if (link === 'https://meet.google.com/') {
    addedIcon.style.display = 'block';
    linkName.style.display = 'none';
    editIcon.style.display = 'none';
    options.style.display = 'none';
  } else {
    addedIcon.style.display = 'block';
    editIcon.style.display = 'none';
    linkName.innerHTML = savedLinkData[0].title;
    audioCheckbox.checked = savedLinkData[0].audio;
    videoCheckbox.checked = savedLinkData[0].video;
    audioCheckbox.disabled = true;
    videoCheckbox.disabled = true;
  }

  addButton.addEventListener('click', () => addLink(link, links));
  settingsIcon.addEventListener('click', openOptionsPage);
  reloadIcon.addEventListener('click', reloadPage);
  editIcon.addEventListener('click', editLinkName);
}

init();
