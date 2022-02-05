import mongoose from 'mongoose';
const mongoURI = 'mongodb+srv://arya123:arya123@apnikahaani.pittl.mongodb.net/apnikahaani?retryWrites=true&w=majority';

const Connection = async() => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Database connected');
    } catch (error) {
        console.log('Error while connecting to the database', error);
    }
}

export default Connection;