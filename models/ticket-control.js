class TicketControl {

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

    }
    get toJson(){
        return {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }
    init(){
        const {hoy,tickets,ultimo,ultimos4} = require('../db/data.json');
        if(hoy == this.hoy)
        {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else
        {
            //es otro dia
            this.guardarDB();
        }
    }   
    guardarDB(){

    }
}
module.exports = TicketControl