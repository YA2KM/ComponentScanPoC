import * as fs from "fs";
import log4js from 'log4js'
import {container} from "tsyringe";
import {IClaroEntryClass} from "../interfaces/IClaroEntryClass";
const path = require('path')
const scanDir = (searchPath: string, entryPointFileName: string): string[] => {
    const directories = fs.readdirSync(searchPath, {withFileTypes: true})
        .filter(directory => !(!directory.isDirectory() || ['node_modules', 'dist'].includes(directory.name)))
    const jsFiles = fs.readdirSync(searchPath, {withFileTypes: true})
        .filter(file => !(!file.isFile() || file.name == entryPointFileName || !["ts", "js"].includes(file.name.split(".")[1])))
    const result = [...jsFiles.map(jsFile => searchPath + path.sep + jsFile.name)]
    directories.forEach(directory => {
        result.push(...scanDir(searchPath + path.sep + directory.name, entryPointFileName))
    })
    return result
}

const logger = log4js.getLogger()
logger.level = log4js.levels.ALL

export function ClaroInjectableScan(target:any) {
    // @ts-ignore
    const entryPoint = require.main.filename as string;
    const entryDirList = entryPoint.split(path.sep)
    const entryPointFileName = entryDirList.pop()
    const entryDir = entryDirList.join(path.sep)
    if (!entryPointFileName) {
        throw Error("entry point file name is undefined.")
    }

    const files = scanDir(entryDir, entryPointFileName)
    new Promise<void>(async res => {
        for (const file of files) {
           const importInfo = await import("file://" + file)
        }
        logger.log("READY TO BOOT")
        res()
    }).then(() => {
        const targetInstance:IClaroEntryClass = container.resolve(target)
        targetInstance.exec()
    })

}
