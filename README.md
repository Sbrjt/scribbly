export default async function postsRoute(app: FastifyInstance) {
const router = app.withTypeProvider<ZodTypeProvider>()

    router.get('/', ...)
    router.get('/me', ...)
    router.post('/', ...)
    router.get('/:id', ...)

}
