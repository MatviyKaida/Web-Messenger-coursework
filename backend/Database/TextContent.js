import { IContent } from "./IContent";
export class TextContent extends IContent {
    TextContentID;
    text;
    constructor (text){
        this.TextContentID = Date.now();
        this.text = text;
    }
}