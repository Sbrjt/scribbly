// Note: This file is unused right now
import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import dotenv from 'dotenv'
import path from 'path'

const workspaceRoot = await findWorkspaceDir(process.cwd())
const envPath = path.join(workspaceRoot!, '.env')

dotenv.config({
	path: envPath,
	quiet: true,
})

// Loads the workspace root .env
// This is only needed when the app is launched with pnpm run
