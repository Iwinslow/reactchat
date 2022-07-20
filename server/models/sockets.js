const BandList = require('./band-list')

class Sockets {
    constructor(io) {
      this.io = io;
      this.bandsList = new BandList()
    }
    socketsEvents() {
      //on connetion
      this.io.on('connection', (socket) => {
        console.log(`Client connected ID ${socket.id}`)
        //send all current bands
        socket.emit('current-bands', this.bandsList.getAllBands())
        //update band name
        socket.on('update-band-name', ({band})=>{
          this.bandsList.updateBandById(band)
          this.io.emit('current-bands', this.bandsList.getAllBands())
        })
        //increase band votes
        socket.on('vote-band', ({id})=>{
          this.bandsList.increseBandVotes(id)
          this.io.emit('current-bands', this.bandsList.getAllBands())
        })
        //delete bands
        socket.on('delete-band', ({id})=>{
          this.bandsList.removeBand(id);
          this.io.emit('current-bands', this.bandsList.getAllBands())
        })
        //add new band
        socket.on('add-band', ({name})=>{
          this.io.emit('current-bands', this.bandsList.addBand(name))
        })
      });
    }
  }
  
  module.exports = Sockets;
  