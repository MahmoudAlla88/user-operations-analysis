# user-operations-analysis

The task is to determine the **most used two operations** and the **percentage of users using them**.

---

## Problem 1: Finding the Most Used Two Operations and User Percentage

### Approach

1. **Reading the Log File**: 
   - We first read the log file containing  users, and operations.
   
2. **Processing the Data**:
   - Each user is considered only once for each operation, even if they performed the operation multiple times.
   - We then calculate the **percentage of users** for each operation. 
   - The formula for calculating **usersPercentage** is:
   
   3. **Sorting the Operations**:
- After calculating the **usersPercentage**, we sort the operations from the most used (highest percentage) to the least used.
- Finally, we display the top two operations with the highest **usersPercentage**.

code:
server\controllers\operationsController.js

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





## Problem 2: Verifying the Results
### Approach to Verification
To verify the results are correct:

1.  **Check the User**: Ensure each operation is counting unique users. Each user should be counted only once for each operation, even if they performed it multiple times.

2. **Check the Percentage Calculation**: Verify that the usersPercentage is calculated based on the total number of unique users across all operations.

3. **Cross-check Results**: The operations with the highest usersPercentage should match the data, and the count of users for each operation should be accurate.

For instance, if you get two operations, one with 50% and the other with 30%, you can manually count the users in the log file to ensure the percentages align.



## Problem 3: Modifying the Program to Return the Top 3 Operations
### Approach
To modify the program to find the top 3 operations, we can adjust the code in Backend to fetch the top 3 instead of just the top 2:

Code:
server\controllers\operationsController.js

const getOperations = async (req, res) => {
  try {
  
    const operationsData = await operationsModel.getOperationsData();

   
    const sortedOperations = operationsData.sort((a, b) => b.usersPercentage - a.usersPercentage);

  
    const topTwoOperations = sortedOperations.slice(0, 3);

  
    res.json(topTwoOperations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch operations data' });
  }
};
This solution simply changes slice(0, 2) to slice(0, 3) to return the top three operations.


## Problem 4: Optimizing the Program for Speed
### Approach
If the program is running slowly, we can optimize it by:

1.  **Efficiently Calculating Percentages**:

Avoid recalculating usersPercentage multiple times. Cache the unique users and their associated operations.

2. **Optimize Data Structures**:

Use a Set for user IDs instead of an array to ensure uniqueness without needing to manually check for duplicates. This speeds up the process of calculating unique users.

3. **Database Optimization**:

If the data grows large, consider switching from a JSON file to a database to store and retrieve the operations more efficiently.

4. **Asynchronous Processing**:

Use async functions to process the data asynchronously to prevent blocking the main thread.


Conclusion
This solution includes handling the addition of user operations, calculating percentages, and optimizing the program for speed.

It addresses all the manager's questions, from verifying results to optimizing performance.