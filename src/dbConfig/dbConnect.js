import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log('db connection failed',error)
    }
}
export default dbConnect;