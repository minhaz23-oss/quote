import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import bcryptjs from 'bcryptjs';
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
     try {
        //getting the information from the form
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        //check if the data is null or empty
        if (!username || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }
        //check if user already exist
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message: 'user already exists'},{status: 400})
        }
        //hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        //saivng the user to the database
        const saving = new User({
            username,
            email,
            password: hashedPassword
        })
        await saving.save();
        return NextResponse.json({message: 'user signed up successfully'},{status: 201})
     } catch (error) {
        return NextResponse.json({
            message: 'error while signing up'
        },{status: 500})
     }
}