import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const getUser = (props: { token: string, endpoint: string }) => {
  const getUserRequest = new Request(`http://159.65.125.158:8000/${props.endpoint}`);

  return fetch(getUserRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });

}

export const postUser = (props: { username: string, password: string, endpoint: string }) => {
  const postUserRequest = new Request(`http://159.65.125.158:8000/${props.endpoint}`, {
    method: "POST",
    body: `{"username": "${props.username}", "password": "${props.password}"}`,
  });

  return fetch(postUserRequest) //return olarak en son return mu donuyor
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((data) => {
      saveToken(data.token);
      return data.user
    })
    .catch((error) => {
      console.log("bullshit 46");
      console.error(error);
    });

}

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


export const saveToken = (props: { token: string }) => { //TRY CATCH KOY CHATGPT'DE VAR??????????????????????????????????????????????
  // do i need to clear first?
  // storage.clearMapForKey('loginState');
  // I always use same key because i only want 1 user to log in or log out.
  const token = props.token
  storage.save({
    key: 'loginState',
    data: token,
  })
}
//normalde DEFAULT_USER'ı hiçbir yerde kullanmıyorum ama bilgileri gerekirse diye koydum.
export const compareToken = () => { // async yapmazsam storage ı beklemiyor ve comparedtoken  if'e girdikten sonra true oluyor yani çalışmıyor.

  return storage.load({
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
}

export const removeToken = () => {
  storage.clearMapForKey('loginState');
}

export default storage;