import mongoose from 'mongoose';

const ToolkitSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
       default: () => new mongoose.Types.ObjectId().toString()
    },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    tags: { type: String },
    price: { type: String },
    category: { type: String },
    techStack: { type: String },
    demoUrl: { type: String },
    githubUrl: { type: String },
    version: { type: String },
    license: { type: String },
    zipUrl: { type: String, required: true },
    imageUrls: [{ type: String }],
    features: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    id: false, // prevent auto-adding id virtual
    versionKey: false,
  }
);


export default mongoose.models?.Toolkit || mongoose.model('Toolkit', ToolkitSchema);
