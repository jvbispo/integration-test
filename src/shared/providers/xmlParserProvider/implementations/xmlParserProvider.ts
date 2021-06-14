
import IXmlParserProvider from '../models/IXmlParserProvider';

var js2xmlparser = require("js2xmlparser");

export default class XmlParserProvider implements IXmlParserProvider{

  public parse(obj: object, title: string): Promise<string> {
    return js2xmlparser.parse(title, obj)
  }

}
