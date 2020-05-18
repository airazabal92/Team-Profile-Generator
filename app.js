const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];
let memberType = "";
let memberCreation = true;

// Function to create manager object
//const generateManager = () => {
inquirer
  .prompt([
    // Ask for manager's name & check to make sure field isn't empty
    {
      type: "input",
      message: "What is your manager's name?",
      name: "managerName",
      validate: async (input) => {
        if (input === "") {
          return "Please provide a valid username.";
        } else {
          return true;
        }
      },
    },
    // Ask for manager's id & check to make sure input is a number or is not empty
    {
      type: "input",
      message: "What is your manager's id?",
      name: "managerId",
      validate: async (input) => {
        if (input === "" || isNaN(input)) {
          return "Ids can only contain whole numbers.";
        } else {
          return true;
        }
      },
    },
    // Ask for manager's email & check to make sure input is a valid email or is not empty
    {
      type: "input",
      message: "What is your manager's email?",
      name: "managerEmail",
      validate: async (input) => {
        const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          input
        );
        if (input === "" || !emailValidation) {
          return "Please enter a valid email address.";
        } else {
          return true;
        }
      },
    },
    // Ask for manager's number & check to make sure input is a number or is not empty
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "managerNum",
      validate: async (input) => {
        if (input === "" || isNaN(input)) {
          return "Please enter a valid number.";
        } else {
          return true;
        }
      },
    },
    // Ask what type of team member needs to be created
    {
      type: "list",
      message: "Which type of team member would you like to add?",
      name: "teamMember",
      choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members",
      ],
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerNum
    );

    team.push(manager);

    team.forEach((element) => {
      console.log(element);
    });

    console.log(answers.teamMember);

    if (answers.teamMember == "Engineer") {
      memberType = "Engineer";
    } else if (answers.teamMember == "Intern") {
      memberType = "Intern";
    } else {
      memberCreation = false;
    }

    nextTeamMember();

    // managerHTML = `<div class="card employee-card">
    //     <div class="card-header">
    //         <h2 class="card-title">${manager.name}</h2>
    //         <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
    //     </div>
    //     <div class="card-body">
    //       <ul class="list-group">
    //           <li class="list-group-item">ID: ${manager.id}</li>
    //           <li class="list-group-item">Email: <a href="mailto:${
    //             manager.email
    //           }">{{ email }}</a></li>
    //           <li class="list-group-item">Office number: ${
    //             manager.officeNumber
    //           }</li>
    //       </ul>
    //     </div>
    //     </div>`;
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    }
  });
//};

//generateManager();

function nextTeamMember() {
  while (memberCreation) {
    console.log("in");
    if (memberType == "Engineer") {
      console.log("Engineer");
    } else if (memberType == "Intern") {
      console.log("Intern");
    } else {
      memberCreation = false;
    }
  }
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
