import { execFile } from 'child_process'
import path from 'path'
import { promisify } from 'util'
import { dumpPosts, copyTypes } from '@/logic/export'

const execFilePromise = promisify(execFile)

export async function POST(req: Request) {
    try {
        await dumpPosts()
        await copyTypes()

        const { stdout, stderr } = await execFilePromise(
            path.join(process.cwd(), 'deploy.sh')
        )

        return new Response(JSON.stringify({
            success: true,
            stdout,
            stderr
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error: unknown) {
        return new Response(JSON.stringify({
            success: false,
            error: error
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}
