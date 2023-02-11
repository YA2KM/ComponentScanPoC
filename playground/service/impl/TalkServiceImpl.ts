import {TalkService} from "../TalkService";
import {ClaroInject} from "../../../src/decorator/ClaroInject";
import {getLogger} from "log4js";
import {TimeService} from "../TimeService";
import {inject, injectable} from "tsyringe";
const logger = getLogger()

@injectable()
@ClaroInject("TalkService")
export class TalkServiceImpl implements TalkService {

    constructor(
        @inject("TimeService") private timeService: TimeService
    ) {
    }


    say(name: string): void {
        logger.log(`Hello ${name} its ${this.timeService.getTimeAsUTCString()} now.`)
    }
}
