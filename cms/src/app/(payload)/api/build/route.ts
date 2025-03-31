import { spawn } from "child_process";
import { copyTypes, dumpPosts } from "@/logic/export";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    dumpPosts();
    copyTypes();

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            console.log("Starting deploy.sh...");
            const process = spawn("sh", ["deploy.sh"]);

            process.stdout.on("data", (data) => {
                console.log("stdout:", data.toString());
                controller.enqueue(encoder.encode(`data: ${data.toString()}\n\n`));
            });

            process.stderr.on("data", (data) => {
                console.error("stderr:", data.toString());
                controller.enqueue(encoder.encode(`data: ERROR: ${data.toString()}\n\n`));
            });

            process.on("close", (code) => {
                console.log("Process exited with code:", code);
                controller.enqueue(encoder.encode(`data: Process exited with code ${code}\n\n`));
                controller.close();
            });

            process.on("error", (err) => {
                console.error("Process error:", err);
                controller.enqueue(encoder.encode(`data: ERROR: ${err.message}\n\n`));
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/event-stream; charset=utf-8",
            Connection: "keep-alive",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
            "Content-Encoding": "none",
        },
    });
}

export const config = {
    runtime: "edge",
};
