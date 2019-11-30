import { MessageShape } from "../assets/enums";

export interface IMessageShape {
    id: string
    type?: MessageShape;
    text?: string;
    uri?: string;
};