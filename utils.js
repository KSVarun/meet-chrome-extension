export function promisifiedData() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (data) => {
      resolve(data);
    });
  });
}

export async function getData() {
  return await promisifiedData();
}

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

export function getDate() {
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

export function setData(data) {
  chrome.storage.sync.set(data);
}

export function getLinkFromStorage(newLink, links) {
  let savedLink;
  if (links) {
    savedLink = links.filter((link) => link.link === newLink);
  }
  return savedLink;
}
