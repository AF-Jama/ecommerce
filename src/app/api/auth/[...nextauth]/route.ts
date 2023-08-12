import NextAuth, { type NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// const authOptions:NextAuthOptions = NextAuth({

//     session:{
//         strategy:"jwt",
//     },

//     providers:[
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID as string,
//             clientSecret: process.env.GOOGLE_SECRET as string,
//         }),
//     ],

//     callbacks:{
//         auth
//     }
// })

// export { handler as GET, handler as POST };