import {ModelosResponse} from '../ModelosResponse';
import {Chats} from '../../pojo/Chats';


export class CreateChatResponse extends ModelosResponse {
    public chat: Chats;
    public token: string;
    public apiKey: string;
    public broad: any;
}
