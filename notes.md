1. install package & gitignore

npm init -y
npm install express ejs pg sequelize
npm install -D sequelize-cli
npx sequelize init
npm i g nodemon
touch .gitignore

2. config sequelize, buat model, migration, dan seeding

//buat database
npx sequelize-cli db:create

//buat model
npx sequelize-cli model:generate --name XXX --attributes email:string,

//buat migration
npx sequelize-cli migration:generate --name add-
npx sequelize-cli db:migrate

//buat seeding data
npx sequelize-cli seed:generate --name seed-data
npx sequelize-cli db:seed:all

3. buat routes, controllers, views

4. helpers

5. bcrypt, express session
npm install bcrypt
npm install express-session