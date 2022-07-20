import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function BandList({ data, voteBand, updateBands, deleteBand }) {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const changeBandName = (e, id) => {
    const newBandName = e.target.value;
    setBands(
      bands.map((band) => {
        return band.id === id ? { ...band, name: newBandName } : band;
      })
    );
  };

  const createRows = () => {
    return bands.map((band, key) => (
      <tr key={key}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => voteBand(band.id)}
            id={bands.id}
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(e) => changeBandName(e, band.id)}
            onBlur={() => updateBands(band)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteBand(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h3>Bandas actuales</h3>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
}

export default BandList;
