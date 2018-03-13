export const locationModel = {
  state: {
    errorMessage: null,
    region: {
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null
    }
  },
  reducers: {
    addRegion(state, payload) {
      console.log("addRegion triggered");
      return { ...state, ...payload };
    },
    addErrorMesaage(state, payload) {
      console.log("addErrorMesaage triggered");
      return { ...state, ...payload };
    }
  }
};

export const userModel = {
  state: {},
  reducers: {
    addUser(state, user) {
      console.log("addUser dispatched: ", user.uid);
      return { state, user };
    }
  }
};

export const photoModel = {
  state: {},
  reducers: {
    addPhoto(state, photo) {
      console.log("add photo triggered");
      return { state, photo };
    }
  }
};

export const memoryModel = {
  state: {
    listViewData: []
  },
  reducers: {
    addMemory(state, memory) {
      console.log("addMemory dispatched", memory);
      return { ...state, ...memory };
    }
  }
};

