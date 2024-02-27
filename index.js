const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const newEmployees = [];

function questionManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter team manager's name.",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID.",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email address.",
      },
      {
        type: " input",
        name: "officeNumber",
        message: "Please enter the manager's office number.",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      newEmployees.push(manager);
      listMenu();
    });
}

function questionEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter engineer's name.",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter engineer's ID.",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter engineer's email address.",
      },
      {
        type: "input",
        name: "github",
        message: "Please enter engineer's GitHub username.",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      newEmployees.push(engineer);
      listMenu();
    });
}

function questionIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter intern's name.",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter intern's ID.",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter intern's email address.",
      },
      {
        type: "input",
        name: "school",
        message: "Please enter intern's school.",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      newEmployees.push(intern);
      listMenu();
    });
}

function listMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do? Add a team member or create team?",
        choices: ["Engineer", "Intern", "Create Team"],
      },
    ])
    .then((answers) => {
      if (answers.menu === "Engineer") {
        questionEngineer();
      } else if (answers.menu === "Intern") {
        questionIntern();
      } else {
        renderHTML();
      }
    });
}

function renderHTML() {
  const generateHTML = render(newEmployees);
  fs.writeFileSync(outputPath, generateHTML);
  console.log(`Success! the Team members has been generated to ${outputPath}`);
}

questionManager();
