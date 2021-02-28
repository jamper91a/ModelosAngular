import {ModelosResponse} from '../ModelosResponse';


export class CreateHostResponse extends ModelosResponse {
    public balance: number;
    public userId: number;
    public profile: string;
    public approved: boolean;
    public banned: boolean;
}
