
export default class Config {
  constructor() {};

  public getPiperiveToken() {
    return process.env.PIPEDRIVE_API_TOKEN;
  }

  public  getBlingToken() {
    return process.env.BLING_API_TOKEN || '';
  }

}




