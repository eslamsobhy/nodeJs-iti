const fs = require("fs");
const { program } = require("commander");
const { log } = require("console");

program
  .command("add")
  .description("to add a new to-do-list item")
  .requiredOption("-t, --title <string>", "The title of the item")
  .action((options) => {
    const dataString =
      fs.readFileSync("./db.json", { encoding: "utf-8" }) || "[]";
    const data = JSON.parse(dataString);

    // id handling
    const lastId = data.length > 0 ? data[data.length - 1].id : 0;
    const toDoItem = {
      id: lastId + 1,
      item: options.title,
    };

    data.push(toDoItem);
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  });

program
  .command("list")
  .description("to display all the list items")
  .action((options) => {
    const dataString = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const data = JSON.parse(dataString);
    console.log(data);
  });

program.parse();
