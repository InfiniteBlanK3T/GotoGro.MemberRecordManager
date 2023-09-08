# SWE20001 Semester 2 2023 - Managing Software Project

# GotoGro-MRM

> [!NOTE]
> Please follow the installation guides for BackEnd

# Front End

# Back End

## The project requires:

- [Node JS 18.17.1](https://nodejs.org/en)

## Dependencies Installation guide

> [!Important]
> Remember to install dependencies (node_modules) INSIDE <root> /BackEnd/..

1. Moving into /BackEnd/ subfolder -> `cd BackEnd/`
2. Run this `npm i` for installing dependencies
3. Then you could run our BackEnd locally with -> `npm run dev`

## (Testing) - Running localhost database:

> [!NOTE]
> BackEnd will be migrated into Cloud service production environment soon. In the mean time please test from your local machine

> [!Warning]
> Modify the credentials that fit your PC: `/BackEnd/.env`

- [XAMP](https://www.apachefriends.org/download.html)
  > Just need to enable MySQL
- Database GUI - any! [PostgreSQL](https://www.postgresql.org/) or [MySQLWorkBench](https://www.mysql.com/products/workbench/) is fine
- Run this -> `npx sequelize-cli db:migrate` to build database schema automatically
  > I already wrote the scripts for database migration, check `/BackEnd/migrations`

## Testing

- APIs Testing - [PostMan](https://www.postman.com)
  > [How to test API using PostMan?](https://youtu.be/CLG0ha_a0q8?si=X-ED1t5GpPRQ-qct)
- Other tests that I have no idea about 🤷

## Task lists

- [ ] Ready up for production environment #1
- [ ] Remodel code sensitive info and put it in `.env` #2
- [ ] [Heroku deployment](https://dashboard.heroku.com/login) - Don't worry @InfiniteBlanK3t will do that
