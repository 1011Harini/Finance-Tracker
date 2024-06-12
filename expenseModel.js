const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const expenseSchema=new Schema(
    {
        title:String,
        amount:Number
    }
);
const expenseModel=mongoose.model('expense',expenseSchema);
module.exports=expenseModel;