import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
dbConnect();
export async function GET(request,{params}){
    try {
        const ids = params.id;
        const token = request.cookies.get('token');

        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET);
    
        const {id} = decodedToken;
   
        const user = await User.findById(id);
        const existingQuote = user.quotes[ids]
        console.log(existingQuote)
        return NextResponse.json(existingQuote,{status: 201})
    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}

export async function POST(request,{params}){
    try {
       
        const ids = params.id;
       
        const reqBody = await request.json()
        
        const quote = reqBody.quote;
        console.log(quote)
        
        const token = request.cookies.get('token');

        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET);
    
        const {id} = decodedToken;
   
        const user = await User.findById(id);
        if(quote){

            user.quotes[ids] = quote;
            await user.save()
        }
        return NextResponse.json({message: 'quote updated successfully'},{status: 201})
    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}