const items = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await items.listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const getContact = await items.getContactById(id);
      return console.table(getContact);
      break;

    case "add":
      const newContact = await items.addContact({ name, email, phone });
      return console.table(newContact);
      break;

    case "remove":
      const deleteContact = await items.removeContact(id);
      return console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
