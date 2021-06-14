
import axios from 'axios';
import {IApiProvider} from '../models/IApiProvider';

type AxiosMethod = 'get' | 'post' | 'put' | 'delete';
interface ICall {
  method: AxiosMethod;
  url: string;
  body?: any;
  headers?: any;
  params?: URLSearchParams,
}

export default class AxiosApi implements IApiProvider{

  public call({ method, url, body, headers, params }: ICall): Promise<any> {
    try {
      return axios.request({
        data: body,
        headers,
        params,
        method,
        url,
      });
    } catch (err){
      throw err;
    }
  }

}
