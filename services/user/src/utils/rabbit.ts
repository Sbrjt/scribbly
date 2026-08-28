import { config } from '@/utils/config'
import { Connection } from 'rabbitmq-client'

const { RABBITMQ_URI } = config

export const rabbit = new Connection(RABBITMQ_URI)

// try: https://github.com/bbc/sqs-consumer
