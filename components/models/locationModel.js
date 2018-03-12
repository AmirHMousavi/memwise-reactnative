const locationModel = {
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

export default locationModel;
