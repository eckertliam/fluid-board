import {JSX, useEffect, useRef} from 'react';
import './Board.css';
import {initBoardState, main} from './BoardLogic.ts';

function Board(): JSX.Element {
    const boardRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const board = boardRef.current;
        let canvasWidth = 0;
        let canvasHeight = 0;
        if (board) {
            canvasWidth = board.width;
            canvasHeight = board.height;
            initBoardState(videoRef, boardRef, canvasWidth, canvasHeight).then((state) => {
                main(state).then(() => {
                    console.log('Main loop finished');
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
            });
        } else {
            console.error('Cannot initialize null board element');
        }
    }, [boardRef, videoRef]);

    return (
        <>
            <video id='userVideo' autoPlay={true} playsInline={true} muted={true} ref={videoRef}></video>
            <canvas id='board' ref={boardRef}></canvas>
        </>
    )
}

export default Board;