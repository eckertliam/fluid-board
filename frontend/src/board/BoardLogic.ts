import React from "react";
import {createGestureRecognizer} from "./GestureService.ts";
import {GestureRecognizer} from "@mediapipe/tasks-vision";

type Context = CanvasRenderingContext2D;

interface BoardState {
    ctx: Context;
    stream: MediaStream;
    video: HTMLVideoElement;
    board: HTMLCanvasElement;
    lastVideoTime: number;
}

function validBoardState(ctx: Context | null, stream: MediaStream | null, video: HTMLVideoElement | null, board: HTMLCanvasElement | null): boolean {
    const validCtx = ctx !== null;
    const validStream = stream !== null;
    const validVideo = video !== null;
    const validBoard = board !== null;
    if (!validCtx) {
        console.error('Context in board state is null');
    }
    if (!validStream) {
        console.error('Stream in board state is null');
    }
    if (!validVideo) {
        console.error('Video in board state is null');
    }
    if (!validBoard) {
        console.error('Board in board state is null');
    }
    return validCtx && validStream && validVideo && validBoard;
}

// initialize the media stream and the whiteboard returning the state
export async function initBoardState(videoRef: React.RefObject<HTMLVideoElement>, boardRef: React.RefObject<HTMLCanvasElement>, width: number, height: number): Promise<BoardState> {
    const video: HTMLVideoElement | null = videoRef.current;
    const board: HTMLCanvasElement | null = boardRef.current;
    let ctx: Context | null = null;
    let stream: MediaStream | null = null;
    if (video && board) {
        stream = await initMedia(video);
        ctx = initBoard(board, width, height);
    } else {
        return Promise.reject('Invalid video or board element');
    }
    return new Promise((resolve, reject) => {
        if (validBoardState(ctx, stream, video, board)) {
            resolve({
               ctx: ctx as Context,
                stream: stream as MediaStream,
                video: video as HTMLVideoElement,
                board: board as HTMLCanvasElement,
                lastVideoTime: -1
            });
        } else {
            reject('Invalid board state');
        }
    });
}


// get user permissions to access camera
// set the video element to the stream
async function initMedia(video: HTMLVideoElement): Promise<MediaStream | null> {
    const constraints: MediaStreamConstraints = {
        video: true,
        audio: false
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    return stream;
}


// initialize the whiteboard
function initBoard(board: HTMLCanvasElement, width: number, height: number): Context | null {
    const ctx = board.getContext('2d');
    if (ctx) {
        board.width = width;
        board.height = height;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        return ctx;
    } else {
        return null;
    }
}



export async function main(boardState: BoardState): Promise<void> {
    const gestureRecognizer = await createGestureRecognizer();
    setInterval(() => {
        loop(boardState, gestureRecognizer);
    }, 100);
}

async function loop(boardState: BoardState, gestureRecognizer: GestureRecognizer): Promise<void> {
    let results = null;
    if (boardState.video.currentTime !== boardState.lastVideoTime) {
        boardState.lastVideoTime = boardState.video.currentTime;
        // get time in ms
        const nowMS: number = Date.now();
        // get the results from the gesture recognizer
        results = gestureRecognizer.recognizeForVideo(boardState.video, nowMS);
    }
    if (results) {
        console.log(results);
    } else {
        console.log('No results');
    }
}