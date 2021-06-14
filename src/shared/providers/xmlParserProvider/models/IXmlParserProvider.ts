export default interface IXmlParserProvider {
    parse(obj: object, title: string): Promise<string>;
}

