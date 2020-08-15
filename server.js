const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const items = require('./routes/api/items');

const app = express();

app.use(cors());
app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected..!'))
  .catch((err) => console.log(err));

//Use routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
