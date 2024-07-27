// controllers/expenseController.js

const Expense = require('../../model/expances');
const Friend = require('../../model/Friends');
// Add a new expense
exports.addExpense = async (req, res) => {
  const { name, amount, item, friends } = req.body;
  try {
    const newExpense = new Expense({ name, amount, item, friends });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calculate total amounts and balances
exports.calculateBalances = async (req, res) => {
  try {
    const expenses = await Expense.find();

    // Calculate total spent
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Find all unique persons involved
    const totalPersons = [...new Set(expenses.map(expense => expense.name))];

    // Calculate share per person
    const sharePerPerson = totalSpent / totalPersons.length;

    // Calculate balances for each person
    const balances = expenses.reduce((acc, expense) => {
      acc[expense.name] = (acc[expense.name] || 0) + expense.amount;
      return acc;
    }, {});

    // Calculate results (balance relative to share per person)
    const results = totalPersons.reduce((acc, person) => {
      acc[person] = (balances[person] || 0) - sharePerPerson;
      return acc;
    }, {});

    res.json({ totalSpent, sharePerPerson, balances, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { name, amount, item, friends } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, { name, amount, item, friends }, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully', deletedExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.Addfriend= async (req, res) => {
    try {
      const { name } = req.body;
      const newFriend = new Friend({ name });
      await newFriend.save();
      res.status(201).json(newFriend);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Get all friends
  exports.getFriends= async (req, res) => {
    try {
      const friends = await Friend.find();
      res.status(200).json(friends);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  exports.deleteFriend= async (req, res) => {
    const { id } = req.params;
    await Friend.findByIdAndDelete(id);
    res.status(200).send({ message: 'Friend removed successfully' });
  }