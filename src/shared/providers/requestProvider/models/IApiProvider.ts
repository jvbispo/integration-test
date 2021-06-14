export interface IApiProvider {
    call({ method, url, body, headers, params }: ICall): Promise<any>;
}

export type requestMethod = 'get' | 'post' | 'put' | 'delete';

interface ICall {
    method: requestMethod;
    url: string;
    body?: any;
    headers?: any;
    params?: URLSearchParams,
}
