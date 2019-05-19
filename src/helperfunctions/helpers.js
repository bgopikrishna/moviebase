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

export const placeholderImage = (text, width = 200, height = 120) => {
  return `https://via.placeholder.com/${width}x${height}/000000/FFFFFF/?text=${text}`;
};

export const getFavListAndWatchListIds = (list, userId) => {
  const { favlist = [], watchlist = [] } = list ? list[userId] : {};
  const favlistIds = Object.keys(favlist).map(id => parseInt(id));
  const watchlistIds = Object.keys(watchlist).map(id => parseInt(id));

  return [favlistIds, watchlistIds];
};

export const getFavlistAndWatchlistCollections = (list, userId) => {
  const { favlist = {}, watchlist = {} } = list ? list[userId] : {};

  const favlistCollection = Object.values(favlist);
  const watchlistCollection = Object.values(watchlist);
  console.log({favlistCollection,watchlistCollection});
  

  return {
    favlistCollection,
    watchlistCollection
  };


};
