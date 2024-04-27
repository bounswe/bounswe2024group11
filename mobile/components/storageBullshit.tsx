import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../context/UserContext';


export const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});


export const saveToken = (props: { user: User }) => {
  // do i need to clear first?
  // storage.clearMapForKey('loginState');
  // I always use same key because i only want 1 user to log in or log out.
  storage.save({
    key: 'loginState',
    data: 'aAadasfdwa',  // gonna be written "user.data"
    expires: 1000 * 3600  // remove expiration???
  })
}

export const compareToken = async (onMatch: (user: User) => void, user: User) => { // async yapmazsam storage ı beklemiyor ve comparedtoken  if'e girdikten sonra true oluyor yani çalışmıyor.
  let comparedToken = false;
  await storage.load({
    key: 'loginState',
    autoSync: true, // autoSync (default: true) means if data is not found or has expired, then invoke the corresponding sync method

    // syncInBackground (default: true) means if data expired,
    // return the outdated data first while invoking the sync method.
    // If syncInBackground is set to false, and there is expired data,
    // it will wait for the new data and return only after the sync completed.
    // DUNNO HOW TO USE EXACTLY
    syncInBackground: true,

    // you can pass extra params to the sync method
    // see sync example below
    syncParams: {
      extraFetchOptions: {
        // blahblah
      },
      someFlag: true
    }
  })
    .then(datum => {
      //data is found
      let isTokenMatched = true; //compare datum with backend, let mi olcak?
      if (isTokenMatched) {
        onMatch(user);
        comparedToken = true;
      }
      else {
        console.warn("token does not match with backend or expired")
      }
    })
    .catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          console.warn("token could not have been found")
          break;
        case 'ExpiredError':
          console.warn("token is expired")
          break;
      }
    });

  console.warn(comparedToken);

  return comparedToken;
}

export const removeToken = () => {
  storage.clearMapForKey('loginState');
}

export default storage;