const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
//const path = require('path');
//const open = require('open');
const convertFactory = require('electron-html-to')
const util = require("util");
const g_html = require('./generateHTML.js')
//const starz = require('starz')
// import {generateHTML} from './generateHTML.js'

const writeFileAsync = util.promisify(fs.writeFile);



const questions = ["What is your GitHub username?", "What is your favorite color?"];

// function writeToFile(fileName, data) {
//     const writeFileAsync = util.promisify(fs.writeFile);
// }

inquirer.prompt([
    {
    type: "input",
    name: "user",
    message: questions[0]
    }
]).then(function(data) {
    console.log(10)
})


function promptUser(){
    inquirer.prompt([
        {
        type: "input",
        name: "user",
        message: questions[0]
        },
        {
        type: "list",
        message: questions[1],
        name: "color",
        choices: [
            "green",
            "blue",
            "pink",
            "red"
        ]
        }
    ]).then(function(data) {

        //var filename = data.name.toLowerCase().split(' ').join('') + ".json";

        let userName = data.user;
        let favColor = data.color;


        const queryUrl = `https://api.github.com/users/${userName}`;

        axios.get(queryUrl).then(function(res) {
            const nameOfUser = res.name;
            const location = res.location;
            const publicRepo = res.public_repos;
            const followers = res.followers;
            const following = res.following;
            const profilePic = res.avatar_url;
            

            const userObject = {
                user: userName,
                name: res.name,
                company: res.company,
                location: res.location,
                public_repos: res.public_repos,
                followers: res.followers,
                following: res.following,
                picURL: res.avatar_url,
                userProfile: res.html_url,
                userBio: res.bio,
                color: favColor,
                stars: res.stars,
                blog: res.blog
            }
            return userObject;

        });
    })
}

// async function init() {
//     console.log("hi")
//     try {
//         const answers = await promptUser();
//         console.log("hello")
  
//         const html = g_html.generateHTML(answers);

//         // writeToFile();
    
//         await writeFileAsync("index.html", html);
  
//         console.log("Successfully wrote to index.html");
//     } catch(err) {
//         console.log(err);
//     }
// }
// init();


promptUser()
  .then(function(answers) {
    const html = g_html.generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });