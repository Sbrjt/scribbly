import { Connection } from 'rabbitmq-client'
import { config } from './config'

const { RABBITMQ_URI } = config

export const rabbit = new Connection(RABBITMQ_URI)

export const rpcClient = rabbit.createRPCClient()
