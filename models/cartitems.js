function cart(oldcart) {
    //fetch all old card items 
    this.items=oldcart.items || {};
    //set total quan and price to zero in case of new cart
    this.total=oldcart.total || 0;
    this.totalmoney=oldcart.totalmoney || 0;
    //update cart
    this.add= function(item, id){
        var cartitem= this.items[id];
        if(!cartitem){
            //if item is not in cart, add it
            cartitem= this.items[id]={
                item:item, quantity:0, price:0
            };
        };
        cartitem.quantity++;
        cartitem.price= cartitem.item.price*cartitem.quantity;
        this.totalmoney+=cartitem.item.price;
        this.total++
    };
    //make an array of all items 
    this.addarr= function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.item[id]);
        }
        return arr;
    };
};

module.exports= cart;