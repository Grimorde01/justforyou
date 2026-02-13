import './App.css'
import LoveLetter from './components/LoveLetter'
import DragItem from './components/DragItem'
import { useMemo } from 'react'
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
        {(() => {
          const images = [img1, img2, img3, img4];
          return dragItems.map((item, i) => (
            <DragItem
              key={item.id}
              className={item.className || 'image'}
              style={{ left: '250px', top: '-500px', zIndex: randomizedZ[i] }}
            >
              <div>
                <div className="image-wrap">
                  <img src={images[i]} alt={item.id} />
                </div>
                {item.text && <p>{item.text}</p>}
              </div>
            </DragItem>
          ));
        })()}
      </div>
    </div>
  )
}

export default App
