import { QuestionCollection } from "inquirer"

export const PAKCAGE_MANAGER_DEFAULT_ANSWER = 'npm';

/**
 * @description return a array of question to be use by inquier package
 * @param name {string} default project's name it could be null
 * @returns {QuestionCollection<any}
 */
export const newProjectQuestions = (name?: string): QuestionCollection<any> => {
  return [
    {
      type: 'input',
      message: "Type the project's name",
      name: "proyectName",
      default: name,
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
    },
    {
      type: 'list',
      message: 'Which package manager do you prefer',
      choices: ['npm', 'yarn'],
      name: 'packageManager',
      default: PAKCAGE_MANAGER_DEFAULT_ANSWER,
    }
  ]
}