require("dotenv").config()
const path = require('path');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const express = require('express');
const exphbs = require('express-handlebars');
const frontRouter = require("./src/Routes/frontRoutes.js");
const router = require("./src/Routes/index.js");
const app = express();
//settings
app.set('port', process.env.PORT || 3000);
const cors = require('cors');
const { session } = require("passport");

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());


app.use(cors());



app.use("/", frontRouter);
app.use("/api", router);




app.set('views', path.join(__dirname, 'views'));

const Handlebars = require('handlebars');

app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  }),
);
app.set('view engine', '.hbs');






const START = (port) => {
    app.listen(port, () => console.log(`MyRadio listening port ${port}!`));

    return app;
}
module.exports = START;