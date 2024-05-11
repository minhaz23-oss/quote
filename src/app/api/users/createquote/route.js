import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

dbConnect();
export async function POST(request){
    try {
        //getting the quote
        const reqBody = await request.json()
        const quote = reqBody;
        console.log(quote)
        //identifying the user
        const token = request.cookies.get('token');
       
        const decodedToken = jwt.verify(token.value,process.env.TOKEN_SECRET);
        const {id} = decodedToken;
        console.log(id)
        //find the user in the database
        const user = await User.findById(id);
        console.log(user)
        user.quotes.push(quote.quote) 
        await user.save();
      
        return NextResponse.json({message: 'hi'},{status: 201})
     } catch (error) {
        return NextResponse.json({message: 'error while posting quote'},{status: 400})
    }
}