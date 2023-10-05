import axios from "axios";

export class Percent {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}

  //get commission
  async GetPercent() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/percent/commission`,
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

  //get commission By id
  async GetPercentByid(packageId) {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/percent/commission/${packageId}`,
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

  //update commission By id
  async UpdateCommission(packageData, packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/percent/commission/${packageId}`,
      data: packageData,
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
