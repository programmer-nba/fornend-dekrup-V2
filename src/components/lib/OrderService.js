import axios from "axios";

export class ConfirmService {

    #token = localStorage.getItem("token");
    #baseUrl = process.env.VUE_APP_DEKRUP
    constructor(){

    }
    async GetOrder(){
        let data;
        const config = {
            method:'get',
            headers: {
                'token':this.#token
            },
            url:`${this.#baseUrl}/order/member/new/list`
        }

        await axios(config).then(result => {
            if(result){
                data = result.data
            }
        })
        .catch(error => {
            data = error;
        })

        return data;
    }

    async ConfirmOrder(_id){
        let data;
        const config = {
            method:'put',
            maxBodyLength: Infinity,
            headers:{
                'token': this.#token,
      
            },
            url:`${this.#baseUrl}/order/member/new/confirm/${_id}`,
        }
        await axios(config).then(result=>{
            if(result){
                data = result.data;
            }
        })
        .catch(error=>{
            data = error
        })

        return data;
    }

    async GetOrderCancel(){
        let data;
        const config = {
            method:'get',
            headers: {
                'auth-token':this.#token
            },
            url:`${this.#baseUrl}orderservice/cancelorder/list`
        }

        await axios(config).then(result => {
            if(result){
                data = result.data
            }
        })
        .catch(error => {
            data = error;
        })

        return data;
    }

    async CanccelOrder(Data,_id){
        let data;
        const config = {
            method:'put',
            maxBodyLength: Infinity,
            headers:{
                'token': this.#token,
            },
            url:`${this.#baseUrl}/order/member/new/cancel/${_id}`,
            data:Data
       
        }
        await axios(config).then(result=>{
            if(result){
                data = result.data;
            }
        })
        .catch(error=>{
            data = error
        })

        return data;
    }

}
