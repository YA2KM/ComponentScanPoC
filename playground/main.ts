import 'reflect-metadata'

import {ClaroInjectableScan} from "../src/decorator/claroInjectableScan";
import {SampleService} from "./service/SampleService";
import {inject, injectable} from "tsyringe";
import {IClaroEntryClass} from "../src/interfaces/IClaroEntryClass";
import {TalkService} from "./service/TalkService";

@injectable()
@ClaroInjectableScan
class Main implements IClaroEntryClass{
    constructor(
        @inject('SampleService') private sampleService: SampleService,
        @inject('TalkService') private talkService: TalkService
    ) {
    }

    exec () {
        this.sampleService.exec()
        this.talkService.say('yamada')
    }
}
