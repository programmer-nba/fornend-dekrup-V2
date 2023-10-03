import axios from "axios";

export class Member {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}

  // create
  async RegisterMember(packageData) {
    let data;
    const config = {
      method: "post",
      url: `${this.#baseUrl}/register`,
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

  //reset password
  async ResetPassword(packageData) {
    let data;
    const config = {
      method: "post",
      url: `${this.#baseUrl}/reset_password`,
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

  //set password
  async setPassword(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/set_password`,
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

  //order new member
  async orderNewMember(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/member/order`,
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
