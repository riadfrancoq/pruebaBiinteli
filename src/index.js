import app from "./app.js";
import DBconfig from "./dataaccess/config/config.js";
const {PORT} = DBconfig;
app.listen(PORT, ()=> {
    console.log('Running on port', PORT);
});