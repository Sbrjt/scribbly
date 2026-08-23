import { Connection } from 'rabbitmq-client'
import { config } from './config'

const { RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } = config

export const rabbit = new Connection({
	port: RABBITMQ_PORT,
	username: RABBITMQ_USER,
	password: RABBITMQ_PASSWORD,
	hostname: 'rabbitmq',
})

export const rpcClient = rabbit.createRPCClient()
