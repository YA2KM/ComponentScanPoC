import {SampleService} from "../SampleService";
import {ClaroInject} from "../../../src/decorator/ClaroInject";
import {getLogger} from "log4js";

const logger = getLogger()

@ClaroInject("SampleService")
export class SampleServiceImpl implements SampleService {
    exec(): void {
        logger.log("OK!")
    }
}
