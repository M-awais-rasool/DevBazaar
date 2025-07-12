import User from '../models/User';
import connectMongo from '@/lib/mongodb';

// GET: Get all sellers
export async function GET(req) {
  await connectMongo();
  try {
    const sellers = await User.find({ role: 'seller' }).select('-password');
    return new Response(JSON.stringify({ success: true, sellers }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: Delete a seller by id (expects ?id=...)
export async function DELETE(req) {
  await connectMongo();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ success: false, message: 'Seller id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const deleted = await User.findOneAndDelete({ _id: id, role: 'seller' });
    if (!deleted) {
      return new Response(JSON.stringify({ success: false, message: 'Seller not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true, message: 'Seller deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
