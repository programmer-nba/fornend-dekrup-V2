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

    order_total: 0,
    order: [],
    order_detail: [],
    cus: {
      member_number: "",
      name: "",
      tel: "",
      address: "",
      line: "",
    }
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


    order: (state) => state.order,
    order_detail: (state) => state.order_detail,
    order_total: (state) => state.order_detail.reduce((sum, order) => sum + order.price, 0),
    cus(state) {
      const data = {
        member_number: state.member_number,
        name: state.cus.name,
        tel: state.cus.tel,
        address: state.cus.address,
        line: state.cus.line,
      }
      return data;
    },
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

    setCus(state, item){
      state.cus.member_number = item.member_number;
      state.cus.name = item.cus_name;
      state.cus.tel = item.cus_tel;
      state.cus.address = item.cus_address;
      state.cus.line = item.cus_line;
    },

    pushOrder(state, item){
      state.order.push(item);
    },
    pushOrderDetail(state, item){
      state.order_detail.push(item);
    },

    delOrder(state, position){
      state.order.splice(position, 1);
    },

    updateTotal(state){
      const total = state.order_detail.reduce((sum, el) => sum + el.price, 0);
      localStorage.setItem('order_total', total);
    },
  },
  actions: {
    deOrder(context, value){
      context.commit('delOrder', value);
      context.commit('updateTotal');
    },
    addOrder(context, value){
      context.commit('pushOrder', value);
    },
    addOrderDetail(context, value){
      context.commit('pushOrderDetail', value);
      context.commit('updateTotal');
    },
  },
  modules: {},
});
