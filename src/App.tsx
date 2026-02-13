import './App.css'
import LoveLetter from './components/LoveLetter'
import DragItem from './components/DragItem'
import React, { useMemo } from 'react'
import img1 from './assets/1st.png'
import img2 from './assets/2nd.png'
import img3 from './assets/3rd.png'
import img4 from './assets/4th.png'
import { appText, dragItems } from './data/text'

function App() {
  const randomizedZ = useMemo(() => {
    const arr = [1000, 1001, 1002, 1003];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }, []);
  return (
    <div className="app">
      <h1>{appText.title}</h1>
      <LoveLetter />

      <div className="drag-demo" style={{ width: '720px', height: '420px', position: 'relative' }}>
        <DragItem className="image" style={{ left: '250px', top: '-500px', zIndex: randomizedZ[0] }}>
          <div>
            <div className="image-wrap">
              <img src={img1} alt="img1" />
            </div>
            {dragItems[0]?.text && <p>{dragItems[0].text}</p>}
          </div>
        </DragItem>
        <DragItem className="image" style={{ left: '250px', top: '-500px', zIndex: randomizedZ[1] }}>
          <div>
            <div className="image-wrap">
              <img src={img2} alt="img2" />
            </div>
            {dragItems[1]?.text && <p>{dragItems[1].text}</p>}
          </div>
        </DragItem>
        <DragItem className="image" style={{ left: '250px', top: '-500px', zIndex: randomizedZ[2] }}>
          <div>
            <div className="image-wrap">
              <img src={img3} alt="img3" />
            </div>
            {dragItems[2]?.text && <p>{dragItems[2].text}</p>}
          </div>
        </DragItem>
        <DragItem className="image" style={{ left: '250px', top: '-500px', zIndex: randomizedZ[3] }}>
          <div>
            <div className="image-wrap">
              <img src={img4} alt="img4" />
            </div>
            {dragItems[3]?.text && <p>{dragItems[3].text}</p>}
          </div>
        </DragItem>
      </div>
    </div>
  )
}

export default App
