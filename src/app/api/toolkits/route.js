import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Toolkit from '../models/Toolkit';

export async function GET() {
    await connectMongo();
    try {
        const toolkits = await Toolkit.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ toolkits });
    } catch (err) {
        console.error('❌ Error fetching all toolkits:', err);
        return NextResponse.json({ error: 'Failed to fetch toolkits' }, { status: 500 });
    }
}
