
import { _id } from '@next-auth/mongodb-adapter';
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        author: { type: String, required: true },
        tags: [{ type: String }],
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false,
    }
);

export default mongoose.models?.Blog || mongoose.model('Blog', BlogSchema);
