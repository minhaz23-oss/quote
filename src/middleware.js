import { NextResponse } from 'next/server'
 

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublic =  path === '/login' || path === '/signup' ;
    const token = request.cookies.get('token')?.value || '';
    console.log(token)
    if(isPublic && token){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  
}
 

export const config = {
  matcher: [
    
    '/login',
    '/signup',
    '/profile'
  ],
}