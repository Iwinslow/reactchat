import { useState } from 'react';

function BandAdd({ addBand }) {
  const [newBand, setNewBand] = useState('');

  const onChange = (e) => {
    setNewBand(e.target.value);
  };

  const addBandFromForm =(e)=>{
    e.preventDefault()
    addBand(newBand)
  }

  return (
    <>
      <h3>Agregar Band</h3>
      <form onSubmit={addBandFromForm}>
        <div className="row">
          <div className="col-8">
            <input
              className="form-control"
              placeholder="Nueva Banda"
              onChange={onChange}
            />
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary"
              type='submit'
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default BandAdd;
