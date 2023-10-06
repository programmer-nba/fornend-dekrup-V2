import axios from "axios";

export class ConfirmOrder {

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
            url:`${this.#baseUrl}/order/list`
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
            url:`${this.#baseUrl}/order/confirm/${_id}`,
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


    async CancelOrder(_id){
        let data;
        const config = {
            method:'put',
            maxBodyLength: Infinity,
            headers:{
                'token': this.#token,
            },
            url:`${this.#baseUrl}/order/cancel/${_id}`,       
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
