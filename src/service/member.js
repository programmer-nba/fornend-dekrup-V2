import axios from "axios";

export class Member {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}

  // create
  async GetMember() {
    let data;
    const config = {
      method: "get",
      url: `${this.#baseUrl}/member`,
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

  // create
  async GetProduct() {
    let data;
    const config = {
      method: "get",
      url: `${this.#baseUrl}/product/member/list`,
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
    // let data;
    let response;
    let err;
    const config = {
      method: "post",
      url: `${this.#baseUrl}/forgot_password`,
      data: packageData,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          response = result.data;
        }
      })
      .catch((error) => {
        err = error;
      });

    return err, response;
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


  async confirmCondition(packageId) {
    let data;
    const config = {
      method: "post",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/condition/${packageId}`,
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

  async ConfirmBank(packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/verify_bank/confirm/${packageId}`,
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

  async Confirmiden(packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/verify_iden/confirm/${packageId}`,
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

  async AddBank(packageData) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/verify_bank`,
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

  async AddIden(packageData) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/verify_iden`,
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
