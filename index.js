const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);
//const axiosGet = util.promisify(axios.get);
const createPdf = require("./makepdf");
const generateHTML = require("./generateHTML");

function promptUser() {
    console.log("we in dis");
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "username"
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
const githubResults;
async function init() {
    await promptUser()
        .then((answers) => {
            // do a github request with axios then pass all the answers to answers
            const username = answers.username;
            //https://api.github.com/users/${username}
            return axios.get(`https://api.github.com/users/${username}`);

        })
        .then((data) => {
            // * Profile image
            githubResults.profilePic = data.avatar_url;
            // * User name
            githubResults.profilePic = data.login;
            // * Links to the following:
            //   * User location via Google Maps
            // location  -> google maps api? -> ???
            //   * User GitHub profile
            githubResults.profilePic = data.html_url;
            //   * User blog
            githubResults.profilePic = data.blog;
            // * User bio
            githubResults.profilePic = data.bio;
            // * Number of public repositories
            githubResults.publicRepos = data.public_repos;
            // * Number of followers
            githubResults.publicRepos = data.followers;
            // * Number of GitHub stars
            // https://api.github.com/users/${username}/starred response.length()
            // * Number of users following
            githubResults.following = data.following;

            githubResults.userName = data.login;



            const html = generateHTML(answers);

            return writeFileAsync("index.html", html);

        })
        .then(() => {
            createPdf();
        })
        .catch((err) => {
            console.log(err);
        });
}

init();

