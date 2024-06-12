const expenseModel = require("../models/expenseModel");

module.exports.getExpense=async(req,res)=>
    {
         try{
             const expense=await expenseModel.find();
             res.send(expense);
         }
         catch(error)
         {
            console.log("error in fetching",error)
         }
    }
module.exports.saveExpense = async(req,res)=>
    {
        try{
            const {title, amount}=req.body;
            const newexpense=await expenseModel.create({title,amount});
            res.send(newexpense);
        }
        catch(error)
        {
            console.log("error in creating");
        }
    }
module.exports.updateExpense= async(req,res)=>
    {
        const id=req.params.id;
        const {title,amount}=req.body;
        try{
            const updatedexpense=await expenseModel.findByIdAndUpdate(id,{title,amount},{new:true})
            res.json(updatedexpense);
        }
        catch(error)
        {
            console.log("Error in updating ",error);
        }
    }
module.exports.deleteExpense=async(req,res)=>
    {
        const id=req.params.id;
        
        try{
            const deletedExpense=await expenseModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Message deleted successfully' });
        }
        catch(error)
        {
            console.log("Error in deleting ",error);
        }
    }