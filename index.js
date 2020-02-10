const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
//const axiosGet = util.promisify(axios.get);
const createPdf = require("./makepdf");
const generateHTML = require("./generateHTML");

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type:"list",
            message:"Which color would you like the pdf built in?",
            choices: ["green","blue", "pink", "red" ],
            name:"color"
        }
    ])
}




function writeToFile(fileName, data) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, encoding, function (err, data) {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    });
}
const githubResults ={};


async function init() {
    await promptUser()
        .then((answers) => {
            // do a github request with axios then pass all the answers to answers
            const username = answers.username;
            //https://api.github.com/users/${username}
            //https://api.github.com/users/${username}/starred
            githubResults.color = answers.color;
            return Promise.all([axios.get(`https://api.github.com/users/${username}`), axios.get(`https://api.github.com/users/${username}/starred`)]);
        })
        .then((dataArr) => {
            const usernameData = dataArr[0].data;
            const usernameStars = dataArr[1].data;
            // * Profile image
            githubResults.profilePic = usernameData.avatar_url;
            // * User name
            githubResults.userName = usernameData.name;
            // * Links to the following:
            //   * User location via Google Maps
            // location  -> google maps api? -> ???
            githubResults.location = `${usernameData.location}`;
            //   * User GitHub profile
            githubResults.githubUrl = usernameData.html_url;
            //   * User blog
            githubResults.blog = usernameData.blog;
            // * User bio
            githubResults.bio = usernameData.bio;
            // * Number of public repositories
            githubResults.publicRepos = usernameData.public_repos;
            // * Number of followers
            githubResults.followers = usernameData.followers;
            // * Number of GitHub stars
            // https://api.github.com/users/${username}/starred response.length()
            // * Number of users following
            githubResults.following = usernameData.following;

            console.log(`user has starred ${usernameStars.length}`);

            githubResults.starred = usernameStars.length;
            const html = generateHTML(githubResults);

            return writeFileAsync("index.html", html);

        })
        .then(() => {
           return createPdf();
        })
        .catch((err) => {
            throw err
        });
}

init();

