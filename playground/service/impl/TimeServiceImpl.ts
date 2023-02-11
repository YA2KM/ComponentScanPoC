import {TimeService} from "../TimeService";
import {ClaroInject} from "../../../src/decorator/ClaroInject";

@ClaroInject("TimeService")
export class TimeServiceImpl implements TimeService {
    getTimeAsUTCString(): string {
        return new Date().toUTCString()
    }

}
