import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import bcryptjs from 'bcryptjs';
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
dbConnect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        //check if user doesn't exists
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({message: 'user doesnt exists'},{status: 400});
        }
        //check the password
        const checkPass = await bcryptjs.compare(password,user.password);
        if(!checkPass){
            return NextResponse.json({message: 'wrong password'},{status: 400})
        }
        //creating token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //creating token
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn: '12h'})
        const response =  NextResponse.json({message: 'user logged in successfully',success: true})
        response.cookies.set('token',token,{path:'/'})
        return response;
    } catch (error) {
        return NextResponse.json({message: 'error while loggin in'},{status: 400})
    }
}