import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef } from 'react';
import Canvas from '../components/Canvas/Canvas'
import './Home.css';

function Home(){
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Virtual Pet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="layoutContainer">
          <div className="contentContainer">
            <div className="canvasContainer">
              <Canvas rectHeight={200} derekiscool={true}/>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
