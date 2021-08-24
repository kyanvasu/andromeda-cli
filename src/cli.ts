import arg from 'arg';
import inquirer, { Question, Answers, prompt } from 'inquirer';
import OptionList from './types/option-list';
import { createProject } from './main';

const DEFAULT_TEMPLATE: string = 'TypeScript';

const parseArgumentsIntoOptions = async (rawArgs: Array<string>=[]): Promise<OptionList> => {
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

    const answers = await prompt(
    [
        {
            type: 'input',
            message: "Insert the name of your project",
            name: "proyectName",
            default: args._[0]
        },
        {
            type: 'confirm',
            message: "Do you want to initialize a git",
            name: "git",
            default: false
        },
        {
            type: 'confirm',
            message: "Do you want to run the installer",
            name: "runInstall",
            default: false
        }
    ]);


    return {
        skipPrompts: args['--yes'] || false,
        template: DEFAULT_TEMPLATE,
        targetDirectory:'',
        templateDirectory:'',
        targetCopyDirectory:'',
        ...answers
    };
}


export const cli = async (args: Array<string> = []) => {
    let options: OptionList = await parseArgumentsIntoOptions(args);
    await createProject(options);
}