export async function requireAuth(request, reply) {
    await request.server.authenticate(request, reply);
}
