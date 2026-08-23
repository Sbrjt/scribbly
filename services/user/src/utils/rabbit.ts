import { config } from '@/utils/config'
import { Connection } from 'rabbitmq-client'

const { RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } = config

export const rabbit = new Connection({
	port: RABBITMQ_PORT,
	username: RABBITMQ_USER,
	password: RABBITMQ_PASSWORD,
	hostname: 'rabbitmq',
})
