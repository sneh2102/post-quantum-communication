const dotenv = require('dotenv');
dotenv.config();
const app = require('express')();
const cors = require('cors');
const port = process.env.PORT;

const options = { 
    origin: "*"
}

app.use(cors(options))

app.get('/',(req,res)=>{
  res.send("Hello i am up and running");
})

app.listen(port, ()=>{
    console.log(`Server Listening on ${port}`);
});