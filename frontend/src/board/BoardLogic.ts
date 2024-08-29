import React from "react";

type Context = CanvasRenderingContext2D;

interface BoardState {
    ctx: Context;
    stream: MediaStream;
}

function validBoardState(ctx: Context | null, stream: MediaStream | null): boolean {
    const validCtx = ctx !== null;
    const validStream = stream !== null;
    if (!validCtx) {
        console.error('Context in board state is null');
    }
    if (!validStream) {
        console.error('Stream in board state is null');
    }
    return validCtx && validStream;
}

// initialize the media stream and the whiteboard returning the state
export async function initBoardState(videoRef: React.RefObject<HTMLVideoElement>, boardRef: React.RefObject<HTMLCanvasElement>, width: number, height: number): Promise<BoardState> {
    const ctx: Context | null = initBoard(boardRef, width, height);
    const stream: MediaStream | null = await initMedia(videoRef);
    return new Promise((resolve, reject) => {
        if (validBoardState(ctx, stream)) {
            resolve({ctx: ctx as Context, stream: stream as MediaStream});
        } else {
            reject('Invalid board state');
        }
    });
}


// get user permissions to access camera
// set the video element to the stream
async function initMedia(videoRef: React.RefObject<HTMLVideoElement>): Promise<MediaStream | null> {
    const video = videoRef.current;
    if (!video) {
        console.error('Cannot initialize null video element');
        return Promise.resolve(null);
    }
    const constraints: MediaStreamConstraints = {
        video: true,
        audio: false
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    return stream;
}


// initialize the whiteboard
function initBoard(boardRef: React.RefObject<HTMLCanvasElement>, width: number, height: number): Context | null {
    const board = boardRef.current;
    if (!board) {
        console.error('board is null');
        return null;
    }
    // fetch the context of the canvas
    const ctx = board.getContext('2d');
    // get the context of the canvas
    if (!ctx) {
        console.error('ctx is null');
        return null;
    }
    // set the initial canvas color
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    return ctx;
}

// the function responsible for entering the draw loop and sending the stream to the server
export function initDrawLoop(boardState: BoardState): void {
    // TODO: send the stream to the server
    const {ctx, stream} = boardState;
}