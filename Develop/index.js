const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./util/generateHtml");

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const { listenerCount } = require("process");

const employees = [];

const managerQuestions = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your manager's employee ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your manager's email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber",
  },
];

function addManager() {
  inquirer.prompt(managerQuestions).then((responses) => {
    const { name, id, email, officeNumber } = responses;
    const manager = new Manager(name, id, email, officeNumber);
    employees.push(manager);
    console.log(manager);
    console.log("Current Team: " + JSON.stringify(employees));
    chooseEmployee();
  });
}

const enginOrIntern = [
  {
    type: "list",
    message: "Would you like to add an engineer or an intern?",
    name: "enginorintern",
    choices: ["engineer", "intern", "finished"],
  },
];

function chooseEmployee() {
  inquirer.prompt(enginOrIntern).then((responses) => {
    if (responses.enginorintern === "engineer") {
      addEngineer();
    } else if (responses.enginorintern === "intern") {
      addIntern();
    } else {
        writeToFile("generateHtml.html", employees)
    }
  })
}

const engineerQuestions = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "engineername",
  },
  {
    type: "input",
    message: "What is your engineer's employee ID?",
    name: "engineerid",
  },
  {
    type: "input",
    message: "What is your engineer's email address?",
    name: "engineeremail",
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "engineergithub",
  },
];

function addEngineer() {
    inquirer.prompt(engineerQuestions).then((responses) => {
        const { engineername, engineerid, engineeremail, engineergithub } = responses;
        const engineer = new Engineer(engineername, engineerid, engineeremail, engineergithub);
        employees.push(engineer);
        console.log(engineer);
        console.log("Current Team: " + JSON.stringify(employees));
        chooseEmployee();
      });
}

const internQuestions = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "internname",
  },
  {
    type: "input",
    message: "What is your intern's employee ID?",
    name: "internid",
  },
  {
    type: "input",
    message: "What is your intern's email address?",
    name: "internemail",
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "internschool",
  },
];

function addIntern() {
    inquirer.prompt(internQuestions).then((responses) => {
        const { internname, internid, internemail, internschool } = responses;
        const intern = new Intern(internname, internid, internemail, internschool);
        employees.push(intern);
        console.log(intern);
        console.log("Current Team: " + JSON.stringify(employees));
        chooseEmployee();
      });
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateHTML(data), (err) => {
      if (err) {
        throw err;
      }
      console.log("success!");
    });
  }

addManager();