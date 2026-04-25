import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextTurn, resetSimulation } from './MyComponents/ReduxSlice';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ecosystem);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        dispatch(nextTurn());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, dispatch]);

  return (
    <>
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1> Symulator Natury</h1>

      <div style={{ 
        backgroundColor: state.currentEvent === 'Brak zdarzeń' ? '#fff' : '#fff3cd',
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        border: '2px solid #ffeeba',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Aktualne zdarzenie: {state.currentEvent}</h2>
        <p style={{ fontStyle: 'italic', color: '#856404' }}>
          {state.currentEvent === 'Susza' && "Wysokie temperatury, trawa wysycha szybciej."}
          {state.currentEvent === 'Pożar' && "Ogień trawi las! Populacje i zasoby gwałtownie spadają."}
          {state.currentEvent === 'Obfitość' && "Idealne warunki dla wszystkich!"}
          {state.currentEvent === 'Choroba królików' && "Wirus dziesiątkuje populację królików."}
          {state.currentEvent === 'Brak zdarzeń' && "Spokojny zwykły dzień"}
        </p>
      </div>

      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Sterowanie</h3>

        <button onClick={() => dispatch(nextTurn())} disabled={autoPlay} style={{ marginRight: '10px' }}>
          Rozpocznij Turę
        </button>

        <button onClick={() => setAutoPlay(!autoPlay)} style={{ marginRight: '10px' }}>
          {autoPlay ? 'Zatrzymaj Tryb Auto Gry' : 'Uruchom Auto Grę'}
        </button>

        <button onClick={() => { setAutoPlay(false); dispatch(resetSimulation()); }}>
          Reset
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1 fr', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Statystyki - Tura {state.turn}</h3>
          <p><strong>Ilość Trawy:</strong> {state.grass}</p>
          <p><strong>Króliki:</strong> {state.rabbits.length}</p>
          <p><strong>Wilki:</strong> {state.wolves.length}</p>

          <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxHeight: '250', overflowY: 'auto' }}>
            <h3>Historia Populacji</h3>
            <table style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Tura</th>
                  <th>Trawa</th>
                  <th>Króliki</th>
                  <th>Wilki</th>
                  <th>Zdarzenie</th>
                </tr>
              </thead>
              <tbody>
                {[...state.history].reverse().map((record) => (
                  <tr key={record.turn}>
                    <td>{record.turn}</td>
                    <td>{record.grass}</td>
                    <td>{record.rabbits}</td>
                    <td>{record.wolves}</td>
                    <td>{record.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default App;
