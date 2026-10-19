// use a class approach to solve week 4 exercise 7
// Shopping cart
interface item {
    name:string,
    unit:number,
    quantity: number
}

let list: item[] = [];

list.push({name: "Milk", unit: 0.90, quantity: 1})
list.push({name: "Bread", unit:0.85, quantity: 1})
list.push({name: "Cold Meat", unit:1.75, quantity: 1})
list.push({name: "Eggs", unit:1.10, quantity: 1})
list.push({name: "Cake", unit:1.50, quantity: 1})
list.push({name: "Carrots", unit:0.70, quantity: 1})
list.push({name: "Potatoes", unit:1.50, quantity: 1})
list.push({name: "Cheese", unit:2.60, quantity: 1})
list.push({name: "Fish", unit:3.25, quantity: 1})
list.push({name: "Bacon", unit:1.60, quantity: 1})


class ShoppingCart {
    private cart: HTMLDivElement;
    private list: item[] = [];
    private sum: number = 0;
    private discount: number = 0; // as percent

    // class needs to know: div containing cart, item list, discount%
    //     
    constructor(output: string, input:item[], discount:number ) {
        this.list = input;
        this.discount = discount;
        this.sum = this.getTotal();
        this.cart = document.getElementById(output) as HTMLDivElement;
        this.cart.innerHTML = this.tableHeader()+ this.tableBody()+ this.tableFooter();
    }

    tableHeader(): string{ // display table header
        return   ` 
    <table>
        <thead>
            <tr>
                <th scope="row">Shop for Items</th>
            </tr>
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
            </tr>
        </thead>
        `
    }

    tableBody(): string { // display table body
       let bodystring:string = `<tbody>` ;
       for (let i:number = 0; i< this.list.length; i++){
            bodystring += ` 
            <tr>
                <td>${list[i].name}</td>
                <td name="unit-price">${list[i].unit}</td>
                <td name="quantity">${list[i].quantity}</td>
            </tr>
            `
       }
       bodystring = bodystring + `</tbody>`;
       return  bodystring;
    }

    tableFooter(): string{ // display table header
        return  `
            <tfoot>
            <tr>
                <td><button id="calculate-total">Sum</button></td>
                <td>Total</td>
                <td id="payment">${this.sum}</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>Total with 25% Discount</td>
                <td id="discounted">${this.sum * (1 - this.discount/100)}</td>
            </tr>
            </tfoot>
        </table>
    ` 
    }

    getTotal(): number {
        let sum: number = 0;
        for (let i = 0; i < this.list.length; i++) {
            const unitPrice = this.list[i].unit;
            const quantity =  this.list[i].quantity;
        sum += unitPrice * quantity ;
        }
        return sum;
    }
}    

let myCart = new ShoppingCart("cart", list, 25);



