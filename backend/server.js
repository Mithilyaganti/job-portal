const exp = require('express');
const app = exp();
const cors = require('cors');
app.use(cors());
require('dotenv').config(); // Ensure .env file is loaded
const mongoClient=require('mongodb').MongoClient
app.use(exp.json())
mongoClient.connect(process.env.DB_URL)   
mongoClient.connect(process.env.DB_URL)     
.then(client=>{
    const coursevita=client.db('coursevita')
    const studentcollection=coursevita.collection('studentcollection')
    const companycollection=coursevita.collection('companycollection')
   
   
    app.set('studentcollection',studentcollection)
    app.set('companycollection',companycollection)
    
    console.log("db is connected")
})
.catch(
    err=>console.log('err in db connection',err)
)
const companyApp=require('./apis/company')
const studentApp=require('./apis/student')


app.use('/student',studentApp)
app.use('/comapany',companyApp) 
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
const port = 4000;

// Start the server and log the port using template literals
app.listen(port, () => console.log(`Webserver on port ${port}`));