#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 2000;
let myPin = 4567;
// Print welcome message
console.log(chalk.blue("\n \tWelcome to Saiqa - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n Pin is Correct, Login Successfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw Amount", "Check Balance"],
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method",
                choices: ["Fast Cash", "Enter Amount"],
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount",
                    choices: [1000, 2000, 5000, 10000, 15000]
                }
            ]);
            if (fastcashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastcashAns.fastCash;
                console.log(`${fastcashAns.fastCash} withdraw successfully`);
                console.log(`Your remaining balance is ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw successfully`);
                console.log(`Your Remaining balance is ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.yellow("Pin is incorrect, Try again!"));
}
