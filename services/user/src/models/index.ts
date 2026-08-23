import { db } from '@/utils/db'
import User_ from './user'

export const User = db.getRepository(User_)
