import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Toolkit from '../../models/Toolkit';

// Helper to build MongoDB filter from query params
function buildFilter(params) {
    const filter = {};
    if (params.name) filter.name = { $regex: params.name, $options: 'i' };
    if (params.category) filter.category = params.category;
    if (params.techStack) filter.techStack = params.techStack;
    if (params.userId) filter.userId = params.userId;
    if (params.tags) filter.tags = { $regex: params.tags, $options: 'i' };
    if (params.price) filter.price = params.price;
    // Add more filters as needed
    return filter;
}

export async function GET(request) {
    await connectMongo();
    try {
        const { searchParams } = new URL(request.url);
        const params = Object.fromEntries(searchParams.entries());
        const filter = buildFilter(params);
        const toolkits = await Toolkit.find(filter).sort({ createdAt: -1 });
        return NextResponse.json({ toolkits });
    } catch (err) {
        console.error('❌ Error fetching filtered toolkits:', err);
        return NextResponse.json({ error: 'Failed to fetch filtered toolkits' }, { status: 500 });
    }
}
