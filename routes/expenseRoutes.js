// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expanceController/expanceController');

// Routes for expenses
router.post('/AddExpenses', expenseController.addExpense);
router.get('/get-expenses', expenseController.getExpenses);
router.get('/calculate', expenseController.calculateBalances);
router.put('/edit-expenses/:id', expenseController.updateExpense);
router.delete('/delete-expenses/:id', expenseController.deleteExpense);
router.post('/addFriend', expenseController.Addfriend);
router.get('/friends', expenseController.getFriends);
router.delete('/removeFriend/:id', expenseController.deleteFriend);
module.exports = router;
