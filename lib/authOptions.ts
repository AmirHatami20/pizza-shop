import {AuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {connectDB} from './mongoose';
import {User} from '@/lib/models/User';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({email: credentials?.email});
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials!.password, user.password);

                if (!isValid) return null;
                console.log(user)
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image || '',
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.image = user.image;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
};
