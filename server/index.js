const express = require('express');
const cors = require('cors');
const operationsRoutes = require('./routes/operations');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 


app.use('/api/operations', operationsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
