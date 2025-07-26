export async function POST({ request }) {
  try {
    const response = new Response(JSON.stringify({ 
      message: 'Logout successful'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    const isSecure = process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') === 'https';
    const secureFlag = isSecure ? '; Secure' : '';
    
    response.headers.set('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${secureFlag}`);

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 