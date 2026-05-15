import 'dotenv/config';
import { app } from './app';
import { connectToDatabase } from './config/database';

connectToDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});