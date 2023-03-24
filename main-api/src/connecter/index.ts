import axios from "axios";
import { iBody } from "../interfaces/body";
export default class Connecter {
  private apiClient: any;

  constructor() {
    this.apiClient = axios.create({ baseURL: process.env.OPARATION_API });
  }

  async saveMail(body: iBody) {

    try {
     const {data}=await this.apiClient.post(`/oparation`, { ...body });
     console.log(data,'received')
     return data;
    } catch (e) {
      console.log(e);
    }
  }
}
