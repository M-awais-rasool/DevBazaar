
import { NextResponse } from 'next/server';
import { s3, S3_BUCKET } from '@/lib/aws-config';
import connectMongo from '@/lib/mongodb';
import Blog from '../models/Blog';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        await connectMongo();

        const formData = await req.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const author = formData.get('author');
        const tagsRaw = formData.get('tags');
        const imageFile = formData.get('image');

        if (!title || !description || !author || !imageFile) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let tags = [];
        if (typeof tagsRaw === 'string') {
            tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
        }

        let imageUrl = '';
        if (imageFile && typeof imageFile === 'object' && 'arrayBuffer' in imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const s3Params = {
                Bucket: S3_BUCKET,
                Key: `blogs/${Date.now()}_${imageFile.name}`,
                Body: buffer,
                ContentType: imageFile.type,
            };
            const uploadResult = await s3.upload(s3Params).promise();
            imageUrl = uploadResult.Location;
        }

        const blog = new Blog({
            _id: uuidv4(),
            title,
            description,
            imageUrl,
            author,
            tags,
        });
        await blog.save();

        return NextResponse.json({ message: 'Blog created', blog }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongo();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}