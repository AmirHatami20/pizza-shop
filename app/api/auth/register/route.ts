import {connectDB} from '@/lib/mongoose';
import {User} from '@/lib/models/User';
import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    try {
        await connectDB();
        const {name, email, password} = await req.json();

        const existing = await User.findOne({email});
        if (existing) {
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        return NextResponse.json({message: 'User registered'}, {status: 201});
    } catch {
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}
