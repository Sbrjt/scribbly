import { app } from '@/app'
import { config } from '@/utils/config'
import { db } from '@/utils/db'
import { gracefulShutdown } from '@app/common'

const { AUTH_SERVICE_PORT: port } = config

app.listen({ port, host: '0.0.0.0' }, () => {
	console.log('Starting auth service 🥳')
})

gracefulShutdown(async () => {
	await db.destroy()
	await app.close()
})
