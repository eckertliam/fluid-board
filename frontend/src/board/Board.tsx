import {JSX, useEffect, useRef} from 'react';
import './Board.css';
import { initBoard } from './handler.ts';

function Board(): JSX.Element {
    const boardRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const canvasWidth: number = 640;
    const canvasHeight: number = 480;

    const init = () => {
        const board = boardRef.current;
        const video = videoRef.current;
        if (video && board) {
            initBoard(board, videoRef, canvasWidth, canvasHeight);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <video autoPlay={true} playsInline={true} muted={true} hidden={true} ref={videoRef}></video>
            <canvas ref={boardRef} width={canvasWidth} height={canvasHeight}></canvas>
        </>
    )
}

export default Board;