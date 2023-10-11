import axios from "axios";

export class CommissionMember {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}

  //get commission register day
  async getComRegisterDay() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
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

  //get commission register week
  async getComRegisterWeek() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
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

  //get commission register week
  async getComAdminiter() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
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

  //get me
  async getMe() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/me`,
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
