import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectMongo from '@/lib/mongodb';
import Toolkit from '../models/Toolkit';
import { s3, S3_BUCKET } from '@/lib/aws-config';
import formidable from 'formidable';
import fs from 'fs';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
        bodyParser: false,
    },
};

function webRequestToNodeRequest(request) {
    const readable = Readable.fromWeb(request.body);
    return Object.assign(readable, {
        headers: Object.fromEntries(request.headers),
        method: request.method,
        url: '',
    });
}

async function parseForm(req) {
    const form = formidable({ multiples: true });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve([fields, files]);
        });
    });
}

const getField = (value) => (Array.isArray(value) ? value[0] : value);

export async function POST(webRequest) {
    await connectMongo();

    const token = await getToken({ req: webRequest, secret: process.env.JWT_SECRET });
    if (!token || !token.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const nodeReq = webRequestToNodeRequest(webRequest);
        const [fields, files] = await parseForm(nodeReq);

        let imageUrls = [];
        if (files.images) {
            const images = Array.isArray(files.images) ? files.images : [files.images];
            for (const img of images) {
                const filePath = img.filepath || img.path;
                if (!filePath) continue;

                const fileContent = fs.readFileSync(filePath);
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `toolkits/${Date.now()}_${img.originalFilename}`,
                    Body: fileContent,
                    ContentType: img.mimetype,
                };
                const upload = await s3.upload(params).promise();
                imageUrls.push(upload.Location);
            }
        }

        let zipUrl = '';

        try {
            const zipFileArray = files.zip;
            const zipFile = Array.isArray(zipFileArray) ? zipFileArray[0] : zipFileArray;

            if (!zipFile || !zipFile.filepath) {
                console.error('❌ Invalid zip file path:', {
                    filepath: zipFile?.filepath,
                    originalFilename: zipFile?.originalFilename,
                    size: zipFile?.size,
                });
                return NextResponse.json({ error: 'Invalid zip file path' }, { status: 400 });
            }

            const fileContent = fs.readFileSync(zipFile.filepath);
            const params = {
                Bucket: S3_BUCKET,
                Key: `toolkits/${Date.now()}_${zipFile.originalFilename}`,
                Body: fileContent,
                ContentType: zipFile.mimetype,
            };

            const upload = await s3.upload(params).promise();
            zipUrl = upload.Location;
        } catch (uploadError) {
            console.error('❌ Failed to upload zip file:', uploadError);
            return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        }


        const toolkit = await Toolkit.create({
            _id: uuidv4(),
            userId: token.id,
            name: getField(fields.name),
            description: getField(fields.description),
            shortDescription: getField(fields.shortDescription),
            tags: getField(fields.tags),
            category: getField(fields.category),
            techStack: getField(fields.techStack),
            demoUrl: getField(fields.demoUrl),
            githubUrl: getField(fields.githubUrl),
            version: getField(fields.version),
            license: getField(fields.license),
            zipUrl,
            imageUrls,
            features: fields.features
                ? Array.isArray(fields.features)
                    ? fields.features
                    : [fields.features]
                : [],
        });

        return NextResponse.json({ success: true, toolkit });
    } catch (err) {
        console.error('❌ Error uploading toolkit:', err);
        return NextResponse.json({ error: 'Failed to add toolkit' }, { status: 500 });
    }
}

export async function GET(req) {
    await connectMongo();
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token || !token.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const toolkits = await Toolkit.find({ userId: token.id }).sort({ createdAt: -1 });
        return NextResponse.json({ toolkits });
    } catch (err) {
        console.error('❌ Error fetching toolkits:', err);
        return NextResponse.json({ error: 'Failed to fetch toolkits' }, { status: 500 });
    }
}
