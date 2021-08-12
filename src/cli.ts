import arg from 'arg';
import inquirer, { Question, Answers } from 'inquirer';
import OptionList from './types/option-list';
import { createProject } from './main';

const DEFAULT_TEMPLATE: string = 'TypeScript';

const parseArgumentsIntoOptions = (rawArgs: Array<string>=[]): OptionList => {
    const spec: arg.Spec = {
        '--git': Boolean,
        '--yes': Boolean,
        '--install': Boolean,
        '-g': '--git',
        '-y': '--yes',
        '-i': '--install',
    };

    const options: arg.Options = {
        argv: rawArgs.slice(2)
    }

    const args = arg(spec, options)

    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: DEFAULT_TEMPLATE,
        proyectName:args._[0],
        runInstall: args['--install'] || false,
        targetDirectory:'',
        templateDirectory:'',
        targetCopyDirectory:''
    };
}

   

export const cli = async (args: Array<string> = []) => {
    let options: OptionList = parseArgumentsIntoOptions(args);
    await createProject(options);

}