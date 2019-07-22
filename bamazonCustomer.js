var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "kiriTo853367$",

    database: "BamazonDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
      inquirer.prompt([
          {
              type: "list",
              name: "action",
              message: "What would you like to do?",
              choices: ["View all Products", "Purchase a Product", "Exit"]
          }
      ]).then(function(answer) {
        if (answer.action === "View all Products") {
            viewProducts();
        } else if (answer.action === "Purchase a Product") {
            purchase();
        } else {
            connection.end();
        }
      });
  }

  function viewProducts() {
      console.log("look at all these products");
  }

  function purchase() {
      console.log("take all of my money");
  }


