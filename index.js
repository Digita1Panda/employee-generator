const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Array to store new team members
const newEmployees = [];

// Function for manager role
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
      // Create new object manager
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      //  Pushes the newly made object into the array
      newEmployees.push(manager);
      //   Runs the menu again
      listMenu();
    });
}

// Function for engineer role
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
      // Create new object engineer
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      //  Pushes the newly made object into the array
      newEmployees.push(engineer);
      //   Runs the menu again
      listMenu();
    });
}

// Function for intern role
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
      // Create new object intern
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      //  Pushes the newly made object into the array
      newEmployees.push(intern);
      //   Runs the menu again
      listMenu();
    });
}

// Lets the user select options in the menu
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
      // To call the right function based on user input
      if (answers.menu === "Engineer") {
        questionEngineer();
      } else if (answers.menu === "Intern") {
        questionIntern();
      } else {
        // Run the renderHTML function to generate it all and put it into folder
        renderHTML();
      }
    });
}

// Passes through the answers into the render and generates the HTML
function renderHTML() {
  const generateHTML = render(newEmployees);
  //   Checks to see if current folder exits if not it will make that folder
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  //   Writes the HTML to the specified output fole
  fs.writeFileSync(outputPath, generateHTML);
  console.log(`Success! the Team members has been generated to ${outputPath}`);
}

// Runs the function to start off.
questionManager();
