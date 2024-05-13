import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../context/UserContext";

const URI = "http://159.65.125.158:8000";

type RequestProps = {
  method: "GET" | "POST";
  endpoint: string;
  body: { [key: string]: string };
  token?: string;
};

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

export class NonuniquenessError extends Error {
  constructor() {
    super("Nonuniqueness or missing required fields");
    this.name = "NonuniquenessError";
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}

export class NotSavedError extends Error {
  constructor() {
    super("Not saved");
    this.name = "NotSavedError";
  }
}

export const request = async (props: RequestProps) => {
  const formData = new FormData();
  for (const key in props.body) {
    formData.append(key, props.body[key]);
  }
  const getRequest = new Request(`${URI}/${props.endpoint}`, {
    method: props.method,
    body: formData,
    headers: props.token ? { Authorization: `token ${props.token}` } : {},
  });
  return fetch(getRequest).then((response) => {
    switch (response.status) {
      case 200:
      case 201:
        return response.json();
      case 400:
        throw new NotFoundError();
      case 401:
        throw new InvalidCredentialsError();
      default:
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
  });
};

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
  },
});

export const saveToken = (props: { token: User }) => {
  // I always use same key because i only want 1 user to log in or log out.
  const token = props.token;
  storage.save({
    key: "loginState",
    data: token,
  });
};
//normalde DEFAULT_USER'ı hiçbir yerde kullanmıyorum ama bilgileri gerekirse diye koydum.
export const compareToken = async () => {
  // async yapmazsam storage ı beklemiyor ve comparedtoken  if'e girdikten sonra true oluyor yani çalışmıyor.

  return storage
    .load({
      key: "loginState",
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
        someFlag: true,
      },
    })
    .catch((error) => {
      if (error.name === "NotFoundError") {
        throw new NotSavedError();
      }
    });
};

export const removeToken = () => {
  storage.remove({ key: "loginState" });
};

export default storage;
