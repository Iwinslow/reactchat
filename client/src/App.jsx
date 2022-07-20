import { useState, useEffect } from 'react';
import BandAdd from './components/BandAdd';
import BandList from './components/BandList';
import { io } from 'socket.io-client';

const connectSocketServer = () => {
  const socket = io('http://localhost:8080', { transports: ['websocket'] });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('current-bands', (data) => {
      setBands(data);
    });
  }, [socket]);

  const voteBand = (id) => {
    socket.emit('vote-band', { id });
  };

  const updateBands = (band) => {
    socket.emit('update-band-name', { band });
  };

  const addBand = (name) => {
    socket.emit('add-band', { name });
  };
  const deleteBand = (id) => {
    socket.emit('delete-band', { id });
  };

  return (
    <div className="container">
      <p>
        Server status:
        {online ? (
          <span className="text-success"> Online</span>
        ) : (
          <span className="text-danger"> Offline</span>
        )}
      </p>

      <h1>BandNames</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            voteBand={voteBand}
            updateBands={updateBands}
            deleteBand={deleteBand}
          />
        </div>
        <div className="col-4">
          <BandAdd addBand={addBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
