import { config } from '@/utils/config'
import { gracefulShutdown } from '@app/common'
import { app } from './app'

const { POST_SERVICE_PORT: port } = config

app.listen({ port, host: '0.0.0.0' }, () => {
	console.log('Starting post service 🥳')
})

gracefulShutdown(async () => {
	await app.close()
})
