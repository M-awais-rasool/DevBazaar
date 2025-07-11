import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Toolkit from '../../models/Toolkit';

export async function GET(request, context) {
    await connectMongo();
    const params = await context.params;
    const { id } = params;
    try {
        const toolkit = await Toolkit.findById(id);
        if (!toolkit) {
            return NextResponse.json({ error: 'Toolkit not found' }, { status: 404 });
        }
        return NextResponse.json({ toolkit });
    } catch (err) {
        console.error('❌ Error fetching toolkit by id:', err);
        return NextResponse.json({ error: 'Failed to fetch toolkit' }, { status: 500 });
    }
}
