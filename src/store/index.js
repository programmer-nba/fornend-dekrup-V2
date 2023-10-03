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
    member_number: "",
    orders: [],
    status: false,
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
    member_number: (state)=>state.member_number,
    status: (state)=>state.status,
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
      (state.id = item.id),
      (state.member_number = item.member_number),
      (state.status = item.status)
    },
    setLoginDefault(state){
      state.user._id ='';
      state.user.name = '';
      state.token = '';
      state.position = '';
      state.member_number = '';
      state.state = false;
      localStorage.clear();
    },
    setUser(state, item){
      state.user._id = item._id;
      state.user.name = item.name;
    },
    addToOrder(state, order) {
      state.orders.push(order);
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
  actions: {},
  modules: {},
});
