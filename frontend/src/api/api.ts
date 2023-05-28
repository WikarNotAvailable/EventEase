import axios from "axios";
import type { AxiosRequestConfig } from "axios";

class ApiService {
  private baseUrl = "http://localhost:8000/api";

  private config: AxiosRequestConfig = {
    headers: {
      Authorization: null,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
  };

  public async postUser(data: any) {
    const req = await axios.post(`${this.baseUrl}/users/`, data, this.config);
    return req.data;
  }

  public async login(data: any) {
    const req = await axios.post(
      `${this.baseUrl}/users/login/`,
      data,
      this.config
    );
    return req.data;
  }

  public async getEvents() {
    const req = await axios.get(`${this.baseUrl}/events`, this.config);
    return req;
  }

    public async getArtists() {
      const req = await axios.get(`${this.baseUrl}/performers`, this.config)
      return req.data
    }

    public async getArtistByName(name: string) {
      const req = await axios.get(`${this.baseUrl}/performers/name/${name}`, this.config)
      return req.data
    }

    public async getArtistsByType(type_id: number) {
      const req = await axios.get(`${this.baseUrl}/performers/type/${type_id}`, this.config)
      return req.data
    }
}

const api = new ApiService();

export default api;
