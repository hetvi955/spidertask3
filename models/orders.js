function order(oldorders) {
    //fetch all old items 
    this.items= oldorders.items || {};
    console.log(oldorders);
    //set total quan and price to zero in case of new cart
    this.total=oldorders.total || 0;
    this.totalmoney=oldorders.totalmoney || 0;
    //update cart
    this.add= function(item, id){
        var orders= this.items[id];
        if(!orders){
            //if item is not in cart, add it
            orders= this.items[id]={
                item:item, quantity:0, price:0
            };
        };
        orders.quantity++;
        orders.price= orders.item.price*orders.quantity;
        this.totalmoney+=orders.item.price;
        this.total++
    };
    //make an array of all items 
    this.addarr= function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};

module.exports= order;