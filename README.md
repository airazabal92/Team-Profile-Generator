![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

# Software Engineering Team Generator

## Description

A command-line application that lets a user create a nicely formatted team roster webpage for easy access to contact information.

The application prompts the user for information about the team manager and team members. The user can input any number of engineers or interns along with their relevant contact information. Once the user completes building their team, an HTML file that displays the team member information is generated.

**Validation**

The application a regular expressions to validate the email input. It also checks to ensure that only numbers are entered in fields that should only have numbers (ids, phone number) and makes sure no field is empty.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [Jest Tesing](#jest-testing)
- [Installation](#installation)
- [Questions](#questions)
- [License](#license)

## Technologies Used

- Node.js
- HTML
- Bootstrap
- Jest

## Demo

<img src="https://i.imgur.com/J1KgiSH.gif" alt="Demo"/>

## Jest Testing

<img src="https://i.imgur.com/gxdS3ii.png" alt="Jest testing" width="600"/>

## Installation

Download the scripts in the <b>lib folder</b>, the template HTMLs in the <b>template folder</b>, the <b>package.json</b> file, and <b>app.js</b> files to be able to run application in the command line.

The application is invoked with the following command:

```sh
node index.js
```

The <b>templates</b> folder contains the base HTML files used to create the final <b>team.html</b> file.

The <b>output folder</b> contains a sample team HTML file. The folder is required for the application to be able to create the <b>team.html</b> file after the user completes inputting all team member information.

The <b>test folder</b> contains tests using Jest that were run to assure that the application functions correctly.

## Questions

If you have any questions, feel free to reach out!

 <img src="https://avatars0.githubusercontent.com/u/60761756?v=4" width="100">
  
 GitHub: airazabal92

## License

Licensed under the [MIT](https://github.com/microsoft/vscode/blob/master/LICENSE.txt) license.
