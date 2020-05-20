const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Variable to store team members
const team = [];

// Determines the current Employee type
let memberType = "Manager";

// Call questions function for manager
let teamMemberId = "manager's";
let message = "What is your manager's office number?";
let validateSpecial = async (input) => {
  if (input === "" || isNaN(input)) {
    return "Please enter a valid number.";
  } else {
    return true;
  }
};

questions(teamMemberId, message, validateSpecial);

// Asks user questions to create appropriate Employee objects
// Function takes teamType (manager/engineer/intern) and special Message/Val for forth question
// First questions stay the same since they are the same for all employees

function questions(teamType, specialMessage, specialVal) {
  let nameMessage = "What is your " + teamType + " name?";
  console.log(nameMessage);
  let idMessage = "What is your " + teamType + " id?";
  let emailMessage = "What is your " + teamType + " email?";
  console.log("Member Type START: " + memberType);
  inquirer
    .prompt([
      // Ask for employee's name & check to make sure field isn't empty
      {
        type: "input",
        message: nameMessage,
        name: "name",
        validate: async (input) => {
          if (input === "") {
            return "Please provide a valid name.";
          } else {
            return true;
          }
        },
      },
      // Ask for employee's id & check to make sure input is a number or is not empty
      {
        type: "input",
        message: idMessage,
        name: "id",
        validate: async (input) => {
          if (input === "" || isNaN(input)) {
            return "Ids can only contain whole numbers.";
          } else {
            return true;
          }
        },
      },
      // Ask for employee's email & check to make sure input is a valid email or is not empty
      {
        type: "input",
        message: emailMessage,
        name: "email",
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
      // Ask special question for Manager (office phone number), Engineer (GitHub account), Intern (school)
      // Include special validation depending the type of input
      {
        type: "input",
        message: specialMessage,
        name: "special",
        validate: specialVal,
      },
      // Ask what type of team member needs to be created next
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
      // Call function to create employee to add to team array
      makeEmployee(
        answers.name,
        answers.id,
        answers.email,
        answers.special,
        answers.teamMember
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error);
      }
    });
}

// Function takes in all the answers as parameters

function makeEmployee(
  employeeName,
  employeeId,
  employeeEmail,
  employeeSpecial,
  nextMember
) {
  console.log(employeeName);
  console.log(employeeId);
  console.log(employeeEmail);
  console.log(employeeSpecial);
  console.log(nextMember);

  // Creates object depending on the current employee type

  if (memberType == "Manager") {
    let manager = new Manager(
      employeeName,
      employeeId,
      employeeEmail,
      employeeSpecial
    );
    team.push(manager);
  } else if (memberType == "Engineer") {
    let engineer = new Engineer(
      employeeName,
      employeeId,
      employeeEmail,
      employeeSpecial
    );
    team.push(engineer);
  } else {
    let intern = new Intern(
      employeeName,
      employeeId,
      employeeEmail,
      employeeSpecial
    );
    team.push(intern);
  }

  team.forEach((element) => {
    console.log(element);
  });

  // Determines the questions for the next employee to be added

  if (nextMember == "Engineer") {
    questions(
      "engineer's",
      "What is your intern's GitHub username?",
      async function (input) {
        if (input === "") {
          return "Please enter a valid username.";
        } else {
          return true;
        }
      }
    );
    memberType = nextMember;
  } else if (nextMember == "Intern") {
    questions(
      "intern's",
      "What school did your intern attend?",
      async function (input) {
        if (input === "") {
          return "Please enter a valid username.";
        } else {
          return true;
        }
      }
    );
    memberType = nextMember;
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
