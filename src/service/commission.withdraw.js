import axios from "axios";

export class Withdraw {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}

  //get commission register Day
  async GetComRegisterDay() {
    let data;
    const config = {
      method: "get",
      url: `${this.#baseUrl}/commission/day`,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  
  //get commission register Day
  async GetComRegisterWeek() {
    let data;
    const config = {
      method: "get",
      url: `${this.#baseUrl}/commission/register/week`,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }

  //get commission Administer
  async GetComAdminister() {
    let data;
    const config = {
      method: "get",
      url: `${this.#baseUrl}/commission/week`,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
}
