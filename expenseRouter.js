const express=require('express');
const router=express();
const {getExpense,saveExpense,updateExpense,deleteExpense}=require('../controller/ExpenseController')

router.get('/get',getExpense);
router.post('/save',saveExpense);
router.put('/update/:id',updateExpense);
router.delete('/delete/:id',deleteExpense);

module.exports=router;