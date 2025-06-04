import app from './App.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CTRL + Click to open in browser: http://localhost:${PORT}`);
});