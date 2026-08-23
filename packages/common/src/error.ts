import closeWithGrace from 'close-with-grace'

export function gracefulShutdown(cleanup: () => Promise<void>) {
	closeWithGrace(async ({ signal, err }) => {
		if (err) {
			console.error(err)
		} else {
			console.info(`${signal} received`)
		}

		console.log('Shutting down...')

		await cleanup()
	})
}

export class ForbiddenError extends Error {
	statusCode = 403
}

export class NotFoundError extends Error {
	statusCode = 404
}

export class ConflictError extends Error {
	statusCode = 409
}

export class UnauthorizedError extends Error {
	statusCode = 401
}

// alt: fastify/fastify-sensible

// Error.stackTraceLimit = 1
