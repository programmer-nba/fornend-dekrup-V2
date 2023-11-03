import axios from "axios";

export class ConfirmService {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}
  
  async GetOrder() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/member/new/list`,
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

  async ConfirmOrder(_id) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/member/new/confirm/${_id}`,
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

  async confirmOrder(packageId) {
    let data;
    const config = {
      method: "put",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/confirm/${packageId}`,
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

  async cancelOrder(packageId) {
    let data;
    const config = {
      method: "put",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/cancel/${packageId}`,
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

  async CancelOrder(_id) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/member/new/cancel/${_id}`,
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

  async GetOrderProduct() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/order/list`,
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
