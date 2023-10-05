import axios from "axios";

export class Withdraw {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}

  //get commission withdraw day
  async GetComiissionDay() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/admin/day`,
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

  //get commission withdraw day
  async GetComiissionWeek() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/admin/week`,
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

  //get commission withdraw day
  async GetWithdrawDay() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/admin/withdrawday`,
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

  //get commission withdraw Week
  async GetWithdrawWeek() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/admin/withdrawweek`,
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

  async ConfirmOrderDay(packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/day/${packageId}`,
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

  async ConfirmOrderWeek(packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/week/${packageId}`,
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

  async CanccelOrderDay(packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/day/cancel/${packageId}`,
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

  async CanccelOrderWeek(packageId) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/commission/week/cancel/${packageId}`,
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
