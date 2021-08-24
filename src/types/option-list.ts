type OptionList = {
    skipPrompts: boolean
    git: boolean
    template: string
    runInstall: boolean
    proyectName: string
    templateDirectory: string 
    targetDirectory: string,
    targetCopyDirectory: string,
    packageManager: string;
}

export default OptionList;