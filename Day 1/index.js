const fs = require("fs");
const { program, Option } = require("commander");

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
      status: "to-do",
    };

    data.push(toDoItem);
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  });

program
  .command("list")
  .description("to display all the list items")
  .action(() => {
    const dataString = fs.readFileSync("./db.json", { encoding: "utf-8" });
    if (!dataString) {
      console.log("Nothing to-do :)");
    } else {
      const data = JSON.parse(dataString);
      console.log(data);
    }
  });

program
  .command("update")
  .description("to update a specific to-do item using its id")
  .option("-t, --title <string>", "new title")
  .requiredOption("-i, --id <string>", "item id")
  .addOption(
    new Option("-s, --status <string>", "the new status").choices([
      "to-do",
      "done",
      "in-progress",
    ])
  )
  .action((options) => {
    // reading the current data
    const dataString = fs.readFileSync("./db.json", { encoding: "utf-8" });

    if (!dataString) {
      console.log("The to-do list is empty!!");
    } else {
      const data = JSON.parse(dataString);

      // updating data
      const newData = data.map((toDoItem) => {
        if (toDoItem.id == +options.id) {
          toDoItem.item = options.title || toDoItem.item;
          toDoItem.status = options.status || toDoItem.status;
        }
        return toDoItem;
      });

      // writing the new data
      fs.writeFileSync("./db.json", JSON.stringify(newData, null, 2));
    }
  });

program
  .command("delete")
  .description("to delete a to-do item")
  .requiredOption("-i, --id <string>", "the item id")
  .action((options) => {
    // reading the current data
    const dataString = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const data = JSON.parse(dataString);

    // deleting the specified item
    const newData = data.filter((toDoItem) => toDoItem.id !== +options.id);

    // writing the new data
    fs.writeFileSync("./db.json", JSON.stringify(newData, null, 2));
  });

program.parse();
