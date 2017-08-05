#!/usr/bin/env node

const config = require('./config');
const fs = require("fs");
const login = require('facebook-chat-api');
const readline = require("readline");
const readlineSync = require('readline-sync');

let answeredThreads = {};

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const reply_message = config.reply_message;
const email = config.email;
const cookiejar = "./cookiejar.json"


if (process.argv[2] === "login") {
    let password = readlineSync.question('Enter your Facebook password: ');

    login(
            { email: email, password: password },
            { forceLogin: true },
            function callback(loginerr, api) {
                if(loginerr) {
                    switch (loginerr.error) {
                        case 'login-approval':
                            console.log('login-approval, provide 2FA token:');
                            rl.on('line', (line) => {
                                loginerr.continue(line);
                                rl.close();
                            });
                        default:
                        console.error(loginerr);
                    };
                    return;
                } else {
                    console.log("Login succesful, saving state to \"cookiejar\".");
                    fs.writeFileSync(cookiejar, JSON.stringify(api.getAppState()));
                    console.log("Please run command again without \"login\".");
                    process.exit()
                };
            }
    );
} else {
    facebook();
};

function facebook() {
    login({appState: JSON.parse(fs.readFileSync(cookiejar, 'utf8'))},{ forceLogin: true }, (err, api) => {
        if(err) return console.error(err);
        api.listen(function callback(err, message) {
            var timestamp = '[' + Date.now() + '] ';
            console.log(timestamp);
            if (err) {
                console.log(err);
            } else if(message) {
                console.log(message.threadID);
                if (!answeredThreads.hasOwnProperty(message.threadID)) {
                    answeredThreads[message.threadID] = true;
                    api.sendMessage(reply_message, message.threadID);
                }
            } else {
                console.log("FU?");
            };
        });
    });
};
