const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
mongoose.connect(process.env.DB_global_link)
.then(data =>{
  if(data){
    console.log("DB connected");
  }
})
.catch(err => {
  console.log(err)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use("/", require('./routes/index'))
app.use("/teachers", require('./routes/teachers'))
app.use("/groups", require('./routes/groups'))
app.use("/students", require('./routes/students')) 
app.use("/attendance", require('./routes/attendance'))
app.use("/auth", require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
