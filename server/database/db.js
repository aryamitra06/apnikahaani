import mongoose from 'mongoose';
const mongoURI = 'mongodb://localhost:27017/apnikahaani?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const Connection = async() => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Database connected');
    } catch (error) {
        console.log('Error while connecting to the database', error);
    }
}

export default Connection;