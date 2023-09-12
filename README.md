# SWE20001 Semester 2 2023 - Managing Software Project

# GotoGro-MRM

> [!NOTE]
> Please follow the instructions below

# The project requires:

- [Node JS 18.17.1](https://nodejs.org/en)


# Front End
> [!Important]
> Remember to has to be in <root folder>.. to run ```http-server``` 
 - Run ```http-server``` to run the Web Development server for Front End
 - Since there isn't any configuration for Home Page once connected navigate to the FrontEnd folder and choose which HTML you want to test.

# Back End
## Dependencies Installation guide
> [!Important]
> Remember to install dependencies (node_modules) INSIDE ```/BackEnd/.. ```
1. Moving into /BackEnd/ OR subfolder -> `cd BackEnd/`
2. Run this `npm i` for installing dependencies
3. Then you could run our BackEnd locally with -> `npm run dev`

## (Testing) - Running localhost database:

1. Install this to run local Database server -> [XAMP](https://www.apachefriends.org/download.html)
  > Just need to enable MySQL
2. Database GUI - [MySQLWorkBench](https://www.mysql.com/products/workbench/)
  -  Create a new connection, leave everything at default
  -  Once you get in run this SQL code ```CREATE NEW SCHEMA swe200001```
3. Run command this inside ```/BackEnd/``` folder-> `npx sequelize-cli db:migrate` to build database schema automatically
  > Once this command runs, check for newly created tables inside your schema. ```swe200001```

## Misc

- APIs Testing - [PostMan](https://www.postman.com)
  > [How to test API using PostMan?](https://youtu.be/CLG0ha_a0q8?si=X-ED1t5GpPRQ-qct)




