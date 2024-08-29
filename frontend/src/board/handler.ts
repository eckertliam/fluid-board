import React from "react";

let ctx: CanvasRenderingContext2D | null = null;
let video: HTMLVideoElement | null = null;

// get user permissions to access camera
function getUserMedia(width: number, height: number): void {
    const constraints: MediaStreamConstraints = {
        video: {
            width: width,
            height: height
        },
        audio: false
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream: MediaStream) => {
            if (video) {
                video.srcObject = stream;
                video.play().then(() => {
                    console.log('video is playing');
                }).catch((error: Error) => {
                    console.error(error);
                });
            } else {
                console.error('video is null');
            }
        })
        .catch((error: Error) => {
            console.error(error);
        });
}


// init the canvas and video elements
export function initBoard(board: HTMLCanvasElement | null, videoRef: React.RefObject<HTMLVideoElement>, width: number, height: number): void {
    video = videoRef.current;
    if (!board) {
        console.error('board is null');
        return;
    }
    if (!video) {
        console.error('video is null');
        return;
    }
    // set the canvas dimensions
    board.width = width;
    board.height = height;
    // set the video dimensions
    video.width = width;
    video.height = height;
    // get the context of the canvas
    ctx = board.getContext('2d');
    if (!ctx) {
        console.error('ctx is null');
        return;
    }
    // set the canvas color
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    // get user permissions to access camera
    getUserMedia(width, height);
    // draw the board
    renderCtx();
}

// handles the board drawing
export function renderCtx(): void {
    // null checks
    if (!ctx) {
        console.error('ctx is null');
        return;
    }
    if (!video) {
        console.error('video is null');
        return;
    }
    // draw the video on the canvas
    ctx.drawImage(video, 0, 0, video.width, video.height);
    // draw the video on the canvas every 100ms
    requestAnimationFrame(renderCtx);
}