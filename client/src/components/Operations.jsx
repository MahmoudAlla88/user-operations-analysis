
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Operations = () => {
  const [operation, setOperation] = useState(''); 
  const [user, setUser] = useState(''); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const [operations, setOperations] = useState([]); 
  const [users, setUsers] = useState(['user1', 'user2', 'user3', 'user4', 'user5']); 

  
//   const fixedOperations = [
//     'add-indicator',
//     'remove-indicator',
//     'update-indicator',
//     'view-indicator',
//     'delete-indicator'
//   ];

 const [fixedOperations, setfixedOperations] = useState([]); 
  useEffect(() => {
    axios.get('http://localhost:5000/api/operations')
      .then((response) => {
        setOperations(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching operations data:', error);
      });
  }, []);

useEffect(() => {
  axios.get('http://localhost:5000/api/operations/all')
    .then((response) => {
      
      const operationsList = response.data.map(op => op.operation); // الحصول على أسماء العمليات فقط
      setfixedOperations(operationsList); 
    })
    .catch((error) => {
      console.error('Error fetching operations data:', error);
    });
}, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!operation || !user) {
      setError('Operation and user are required!');
      return;
    }

    try {
  
      const response = await axios.post('http://localhost:5000/api/operations', { operation, user });
      setSuccess(response.data.message); 
      setError('');
      setOperation('');
      setUser('');

      
      const updatedOperations = await axios.get('http://localhost:5000/api/operations');
      setOperations(updatedOperations.data);
    } catch (error) {
      setError('Error sending data: ' + error.message);
      setSuccess('');
    }
  };

  
  const sortedOperations = [...operations].sort((a, b) => b.usersPercentage - a.usersPercentage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Add or Update User Operations</h1>

     
      {error && <div className="text-red-500 mb-4">{error}</div>}

      
      {success && <div className="text-green-500 mb-4">{success}</div>}

      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="user" className="block text-lg mb-2">Select User:</label>
          <select
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border border-gray-300 p-2"
          >
            <option value="">Select a user</option>
            {users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="operation" className="block text-lg mb-2">Select Operation:</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="border border-gray-300 p-2"
          >
            <option value="">Select an operation</option>
            {fixedOperations.map((op, index) => (
              <option key={index} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Operation</button>
      </form>

     
      <div className="mt-4">
        <h2 className="text-xl mb-2">Top 2 Operations</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Operation</th>
              <th className="border border-gray-300 p-2">Users Percentage</th>
            </tr>
          </thead>
          <tbody>
            {sortedOperations.map((operation, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{operation.operation}</td>
                <td className="border border-gray-300 p-2">{operation.usersPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Operations;
