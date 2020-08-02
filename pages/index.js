import { useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useMovement from '../components/useMovement'

export default function Home() {
  const linkDownRef = useRef(null);
  const linkRightRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const {x, y, direction, move} = useMovement();

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
  }, []);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    let theLinkRef;
    if(direction === 'up') theLinkRef = linkUpRef;
    if(direction === 'down') theLinkRef = linkDownRef;
    if(direction === 'left') theLinkRef = linkLeftRef;
    if(direction === 'right') theLinkRef = linkRightRef;

    ctx.drawImage(theLinkRef.current, x, y)
  }, [x,y]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Zelda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.app}>
        <canvas ref={canvas}/>

        <div className={styles.arrows}>
          <button onClick={() => move('up')}>Up</button>
          <button onClick={() => move('left')}>Left</button>
          <button onClick={() => move('down')}>Down</button>
          <button onClick={() => move('right')}>Right</button>
        </div>

        <div className={styles.images}>
          <img src="https://i.imgur.com/JYUB0m3.png" ref={linkDownRef} alt="Down" />
          <img src="https://i.imgur.com/GEXD7bk.gif" ref={linkRightRef} alt="Right" />
          <img src="https://i.imgur.com/XSA2Oom.gif" ref={linkUpRef} alt="Up" />
          <img src="https://i.imgur.com/4LGAZ8t.gif" ref={linkLeftRef} alt="Left" />
        </div>
      </main>
    </div>
  )
}
