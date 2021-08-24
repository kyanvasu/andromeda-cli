import arg from 'arg';
import { prompt } from 'inquirer';
import OptionList from './types/option-list';
import { createProject } from './main';
import { newProjectQuestions } from './questions';

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
    const answers = await prompt(newProjectQuestions(args._[0]));

    return {
        ...answers,
        skipPrompts: args['--yes'] || false,
        template: DEFAULT_TEMPLATE,
        targetDirectory:'',
        templateDirectory:'',
        targetCopyDirectory:'',
    };
}


export const cli = async (args: Array<string> = []) => {
    let options: OptionList = await parseArgumentsIntoOptions(args);
    await createProject(options);
}