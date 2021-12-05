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

const dateSuffix = {
  1: 'st ',
  2: 'nd ',
  3: 'rd ',
  21: 'st ',
  22: 'nd ',
  23: 'rd ',
  31: 'st ',
};

function getMonth(month) {
  //month with be index based
  //for example jan - 0, feb - 1, mar - 2
  //adding 1 to make it more readable
  return monthMap[month + 1];
}

function getTime(date) {
  return (
    date.getHours().toString() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes().toString()
  );
}

function getDateSuffix(date) {
  return dateSuffix[date] ?? 'th ';
}

export function getDate() {
  let date = new Date();
  date =
    date.getDate().toString() +
    getDateSuffix(date.getDate()) +
    getMonth(date.getMonth()) +
    ' ' +
    date.getFullYear() +
    ', ' +
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
