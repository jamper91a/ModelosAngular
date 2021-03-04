import {ModelosPojo} from './ModelosPojo';
import {Groups} from './Groups';
import {Countries} from './Countries';
import {Hosts} from './Hosts';

export class Chats extends ModelosPojo {
    public hostId: number;
    public sessionId: string;
    public finish: string;
    public broadCastUrL: string;



}
