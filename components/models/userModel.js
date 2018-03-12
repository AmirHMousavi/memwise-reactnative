// function to create a one second delay
const delay = time => new Promise(resolve => setTimeout(() => resolve(), time));

// count model
const userModel = {
  state: {},
  reducers: {
    addUser(state, user) {
      console.log("addUser dispatched: ");
      return { state, user };
    }
  }
};

export default userModel;
