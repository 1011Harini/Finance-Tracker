const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(cors())
app.use(express.json())
const router=require('./routes/expenseRouter')
const connectMDB=async()=>
    {
        try{
            const conn=await mongoose.connect('mongodb+srv://Harini:Harini1011@expensecluster.serojs4.mongodb.net/Datas?retryWrites=true&w=majority&appName=Expensecluster')
            console.log("MongoDB connected");
        }
        catch(error)
        {
            console.log(error);
        }
    }
app.listen(5000, () => {
    console.log("app is running");
})
app.use('/exp',router);
connectMDB()