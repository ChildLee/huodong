namespace vue {
  export const $app: {
    storageStore: storageStore;
  };

  export interface storageStore {
    userStore: userStore;
  }

  export interface userStore {
    getUserId: any
  }
}
