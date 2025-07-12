
# DevBazaar

DevBazaar is a marketplace platform for buying and selling developer toolkits, resources, and blogs. Built with Next.js, it features authentication, admin and seller dashboards, toolkit uploads, blog management, and more.

## Features

- User authentication (sign up, login, NextAuth)
- Admin dashboard for managing sellers, blogs, and toolkits
- Seller dashboard for uploading and managing toolkits
- Blog creation and management
- Toolkit detail pages with file/image uploads
- Filtering and searching toolkits
- Responsive UI with modern design


## Images
<img width="1662" height="848" alt="Image" src="https://github.com/user-attachments/assets/d13c8475-7acd-4823-892a-2522285fd708" />
<img width="1666" height="857" alt="Image" src="https://github.com/user-attachments/assets/266fbfbc-296a-47bc-9114-4627e7129e8d" />
<img width="1654" height="851" alt="Image" src="https://github.com/user-attachments/assets/46a310fb-b069-4c1b-9042-70a720efa7aa" />
<img width="1676" height="852" alt="Image" src="https://github.com/user-attachments/assets/82b3cf5b-890d-4ab7-b05b-2e21555fb2c8" />
<img width="1656" height="855" alt="Image" src="https://github.com/user-attachments/assets/227f53e4-a7b8-4bc2-9f63-4c17aec29291" />
<img width="1649" height="863" alt="Image" src="https://github.com/user-attachments/assets/a595e87d-ba35-4d9b-8c55-6f41aba23e2d" />
<img width="1666" height="853" alt="Image" src="https://github.com/user-attachments/assets/2d56155f-ccc8-40fa-ae7b-03d6adda6bb8" />

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# NextAuth secret and providers
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AWS S3 (if using file uploads)
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
```

> **Note:** Only add the AWS variables if you plan to use AWS S3 for file uploads.

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Project Structure

- `src/app/` - Main app routes and pages
- `src/component/` - Reusable UI and feature components
- `src/lib/` - Utility and config files (e.g., MongoDB, AWS)
- `src/api/` - API route handlers (auth, blogs, toolkits, etc.)
