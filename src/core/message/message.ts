import {MessageBus} from "./messagebus";
import {IMessageHandler} from "./imessagehandler"

export enum MessagePriority {
    NORMAL,
    HIGH
}

export class Message {
    public code: string;

    public context: any;

    public sender: any;

    public priority: MessagePriority;

    constructor(code: string, sender: any, context: any, priority: MessagePriority = MessagePriority.NORMAL) {
        this.code = code;
        this.sender = sender;
        this.context = context;
        this.priority = priority;

    }

    public static send(code: string, sender: any, context?: any) {
        MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
    }

    public static sendPriority(code: string, sender: any, context?: any) {
        MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
    }

    public static subscribe(code: string, handler: IMessageHandler) {
        MessageBus.addSubscription(code, handler);
    }

    public static unsubscribe(code: string, handler: IMessageHandler) {
        MessageBus.removeSubscription(code, handler);
    }
}