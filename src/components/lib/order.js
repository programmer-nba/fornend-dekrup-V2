import axios from "axios";

export class ConfirmOrder {

    #token = localStorage.getItem("token");
    #baseUrl = process.env.VUE_APP_DEKRUP
    constructor(){

    }

    async ConfirmOrder(_id) {
        let data;
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            headers: {
                'token': this.#token,
            },
            url: `${this.#baseUrl}/order/confirm/${_id}`,
        }
        try {
            const result = await axios(config);
            data = result.data;
        } catch (error) {
            data = error;
        }
        return data;
    }
    
}
