declare module '@/utils/request' {
  import { AxiosInstance } from 'axios';

  const request: AxiosInstance;
  export default request;

  // 如果还有其他导出
  export const get: AxiosInstance['get'];
  export const post: AxiosInstance['post'];
  export const put: AxiosInstance['put'];
  export const del: AxiosInstance['delete'];
}
