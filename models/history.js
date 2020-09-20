const items= require('../models/item');
function history(oldhistorys) {
    this.items= oldhistorys.items || {};
    console.log(oldhistorys);
    this.total=oldhistorys.total || 0;
    this.totalmoney=oldhistorys.totalmoney || 0;
    //update
    this.add= function(item, id, time){
        var date= new Date();
        var historys= this.items[id];
        if(!historys){
            historys= this.items[id]={
                item:item, quantity:0, price:0,time:date.toDateString()
            };
        };
        items.quantity--;
        historys.quantity++;
        historys.price= historys.item.price*historys.quantity;
        this.totalmoney+=historys.item.price;
        this.total++
    };
    this.addarr= function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};

module.exports= history;