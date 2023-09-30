import { createStore } from "vuex";

export default createStore({
  state: {
    isFooter : true,
    isLoading : false,
    logedIn: false,
    user : [],
    token : localStorage.getItem("token"),
    name: "",
    position: "",
    id: "",

  },
  getters: {
    isFooter : (state)=>state.isFooter,
    isLoading : (state)=>state.isLoading,
    passcode : (state)=>state.passcode,
    user(state){
      const data = {
        _id : state.user._id,
        name : state.user.name
      }
      return data;
    },
    token : (state)=>state.token,
    logedIn: (state) => state.logedIn,
    position: (state)=>state.position,
    name: (state)=>state.name,
    id: (state)=>state.id,
  },
  mutations: {
    setFooter(state,item){
      state.isFooter = item;
    },
    setLoading(state, item){
      state.isLoading = item;
    },
    setLogin(state,item){
      (state.logedIn = item.logedIn),
      (state.name = item.name),
      (state.position = item.position),
      (state.id = item.id)
    },
    setLoginDefault(state){
      state.user._id ='';
      state.user.name = '';
      state.token = '';
      state.position = '';
      localStorage.clear();
    },
    setUser(state, item){
      state.user._id = item._id;
      state.user.name = item.name;
    },
  },
  actions: {},
  modules: {},
});
