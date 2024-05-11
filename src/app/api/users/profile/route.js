import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import dbConnect from '@/dbConfig/dbConnect';
import User from '@/models/userSchema';
dbConnect()
export async function GET(request) {
    try {
        //get the token and decode it and get the id
        const token = request.cookies.get('token');
        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET);
        console.log(decodedToken)
        const {id} = decodedToken;
        //find the user 
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const { username,email,quotes } = user;
        const  userInfo ={username,email,quotes} ;
        return NextResponse.json(userInfo, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error while fetching user profile' }, { status: 400 });
    }
}