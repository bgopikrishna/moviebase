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

//create an obj for cast & crew with name, image , id

export const getCastNCrewData = totalCast => {
  return totalCast.map(castMem => {
    return null;
  });
};

export const placeholderImage = text => {
  return `https://via.placeholder.com/200x120/000000/FFFFFF/?text=${text}`;
};
