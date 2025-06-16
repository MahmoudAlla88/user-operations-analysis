const operationsModel = require('../models/operationsModel');

const addOperation = async (req, res) => {
  const { operation, user } = req.body; 

  if (!operation || !user) {
    return res.status(400).json({ error: 'Operation and user are required' });
  }

  try {
    const operationsData = await operationsModel.getOperationsData(); 

   
    const operationIndex = operationsData.findIndex(op => op.operation === operation);

    if (operationIndex === -1) {
      return res.status(404).json({ error: 'Operation not found' });
    }

    
    let usersSet = new Set(operationsData[operationIndex].users || []);  

    usersSet.add(user); 

    
    operationsData[operationIndex].users = Array.from(usersSet); 

    
    const totalUsers = new Set(); 
    operationsData.forEach(op => {
      op.users.forEach(user => {
        totalUsers.add(user); 
      });
    });

    const totalUsersCount = totalUsers.size; 

    
    operationsData.forEach(op => {
      op.usersPercentage = (op.users.length / totalUsersCount) * 100; 
    });

   
    await operationsModel.saveOperationsData(operationsData);
    res.status(200).json({ message: 'Operation updated successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update operation' });
  }
};

const getAllOperations = async (req, res) => {
  try {
    const operationsData = await operationsModel.getOperationsData();

    
    res.json(operationsData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch all operations data' });
  }
};

const getOperations = async (req, res) => {
  try {
  
    const operationsData = await operationsModel.getOperationsData();

   
    const sortedOperations = operationsData.sort((a, b) => b.usersPercentage - a.usersPercentage);

  
    const topTwoOperations = sortedOperations.slice(0, 2);

  
    res.json(topTwoOperations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch operations data' });
  }
};



module.exports = { addOperation, getOperations ,getAllOperations};
