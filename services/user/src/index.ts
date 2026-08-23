import { app } from '@/app'
import { config } from '@/utils/config'
import { gracefulShutdown } from '@app/common'

const { USER_SERVICE_PORT: port } = config

app.listen({ port, host: '0.0.0.0' }, () => {
	console.log('Starting user service 🥳')
})

gracefulShutdown(async () => {
	await app.close()
})
