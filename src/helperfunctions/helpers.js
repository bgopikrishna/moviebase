//To return value based on the item
export const ifNotExists = (data, ifExists, ifNotExists) =>
  data ? ifExists : ifNotExists;

//To get Items from local storage

export const storeDataInLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
export const getDataFromLocalStorage = key =>
  JSON.parse(localStorage.getItem(key));

//parse JSON from fetch
export const parseJSON = data => data.json();
