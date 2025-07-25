export async function POST({ request }) {
  try {
    // Créer la réponse avec le cookie supprimé
    const response = new Response(JSON.stringify({ 
      message: 'Déconnexion réussie'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    // Supprimer le cookie de token
    response.headers.set('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');

    return response;

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 