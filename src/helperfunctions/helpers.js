
//To return value based on the item
export const ifNotExists = (data, ifExists, ifNotExists) =>
  data ? ifExists : ifNotExists;

//To get Items from local storage



//parse JSON from fetch 
export const parseJSON = (data) => data.json()