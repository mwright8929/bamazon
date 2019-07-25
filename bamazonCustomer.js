var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "kiriTo853367$",

    database: "BamazonDB"
  });

  var items;

  connection.connect(function(err) {
    if (err) throw err;
    connection.query("select * from Products", function(err, data) {
        if (err) throw err;
        items = data;
        start();
    })
    
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
      //console.log("look at all these products");
      connection.query("select * from Products", function(err, data){
          if (err) throw err;
          console.log("-------------------------------------------------------------");
          console.log("Item ID | Product | Department | Price | # of items in stock");
          console.log("-------------------------------------------------------------");
          for (e in data) {
              console.log(`${data[e].item_id} | ${data[e].product_name} | ${data[e].department_name} | ${data[e].price} | ${data[e].stock_quantity}`);
          }
          console.log("-------------------------------------------------------------");

          inquirer.prompt([
              {
                  type: "list",
                  name: "action",
                  message: "See anything you like?",
                  choices: ["Purchase a Product", "Main Menu", "Exit"]
              }
          ]).then (function(answer) {
              if(answer.action === "Purchase a Product") {
                  purchase();
              } else if(answer.action === "Main Menu") {
                  start();
              } else {
                  connection.end();
              }
          })
      })
  }

  function purchase() {
      //console.log("take all of my money");
      inquirer.prompt([
          {
            name: "item_id",
            message: "Which item would you like to purchase (use item id)"
          },
          {
            name: "quantity",
            message: "How many would you like to buy"
          }
      ]).then (function(answer) {
        // for (y in items) {
        //     if (items[y].item_id == answer.items_id) {
        //         if (items[y].stock_quantity < answer.quantity) {
        //             console.log("Insufficient Quantity");
        //         } else {
        //             var updateTable = parseInt(items[y].stock_quantity) - parseInt(answer.quantity);
        //             console.log('MY UPDATED TABLE',updateTable)
        //             connection.query(
                        
        //                 `update Products set stock_quantity = ${updateTable} where item_id = ${answer.item_id}`,
        //                 function (err) {
        //                     if (err) throw err;
                            
        //                 }
                    
        //             );
        //         }
        //     }
        //     console.log(items[y].stock_quantity);
        // }
        
        // Update THe stock_quantity number
        // update item_id based on user input
        connection.query("update Products set stock_quantity = 899999 where item_id = 1", function(err, res) {
            console.log("product updated");
            console.log(err);
            console.log(res);
        })
      })
  }


