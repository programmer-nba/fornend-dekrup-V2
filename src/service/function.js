import axios from "axios";

export class Function {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_DEKRUP;
  constructor() {}


  async GetFunction() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/more/function_more`,
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

  async GetFunctionById(packageId) {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/more/function_more/${packageId}`,
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

  async CreateFunction(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/more/function_more/create`,
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

  async UpdateFunction(packageData, packageId) {
    let data;
    const config = {
      method: "put",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/more/function_more/${packageId}`,
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

  async putImage(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/image/collection`,
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

  async DeleteImg(packageId) {
    let data;
    const config = {
      method: "delete",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/delete/image/${packageId}`,
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
