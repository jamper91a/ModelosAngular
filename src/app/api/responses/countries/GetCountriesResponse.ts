import {ModelosResponse} from '../ModelosResponse';
import {Countries} from '../../pojo/Countries';


export class GetCountriesResponse extends ModelosResponse {
    public countries: Countries[];
}
