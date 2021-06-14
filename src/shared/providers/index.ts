import { container } from 'tsyringe';

import IApiProvider from './requestProvider/models/IApiProvider';
import AxiosApi from './requestProvider/implementations/axiosApi';
import IXmlParserProvider from './xmlParserProvider/models/IXmlParserProvider';
import XmlParserProvider from './xmlParserProvider/implementations/xmlParserProvider';


container.registerSingleton<IApiProvider>(
  'ApiProvider',
  AxiosApi,
);

container.registerSingleton<IXmlParserProvider>(
  'XmlParserProvider',
  XmlParserProvider,
);


