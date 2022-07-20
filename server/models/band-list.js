const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Korn'),
      new Band('Rata Blanca'),
      new Band('Mambru'),
    ];
  }
  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }
  getAllBands() {
    return this.bands;
  }
  getSingleBandById(id) {
    return this.bands.filter((band) => band.id === id);
  }
  updateBandById(updatedBand) {
    this.bands = this.bands.map((band) =>
      band.id === updatedBand.id ? { ...updatedBand } : band
    );
  }
  increseBandVotes(id) {
    this.bands = this.bands.map((band) =>
      band.id === id ? { ...band, votes: band.votes + 1 } : band
    );
  }
  decreaseBandVotes(id) {
    this.bands = this.bands.map((band) =>
      band.id === id ? { ...band, votes: band.votes - 1 } : band
    );
  }
  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }
}

module.exports = BandList;
