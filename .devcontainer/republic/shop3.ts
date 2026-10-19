// use a class approach to solve week 4 exercise 7
// Shopping cart
interface item {
    name:string,
    unit:number,
    quantity: number
}

let list3: item[] = [];

list3.push({name: "Milk", unit: 0.90, quantity: 1})
list3.push({name: "Bread", unit:0.85, quantity: 1})
list3.push({name: "Cold Meat", unit:1.75, quantity: 1})
list3.push({name: "Eggs", unit:1.10, quantity: 1})
list3.push({name: "Cake", unit:1.50, quantity: 1})
list3.push({name: "Carrots", unit:0.70, quantity: 1})
list3.push({name: "Potatoes", unit:1.50, quantity: 1})
list3.push({name: "Cheese", unit:2.60, quantity: 1})
list3.push({name: "Fish", unit:3.25, quantity: 1})
list3.push({name: "Bacon", unit:1.60, quantity: 1})


class ShoppingCart3 {
    private cart: HTMLDivElement;
    private list: item[] = [];
    private sum: number = 0;
    private discount: number = 0; // as percent

    // class needs to know: div containing cart, item list, discount%
    //     
    constructor(output: string, input:item[], discount:number ) {
        this.list = input;
        this.cart = document.getElementById(output) as HTMLDivElement;
        this.discount = discount;
        this.display();
    }

    private addListeners(){
        this.cart.querySelectorAll<HTMLInputElement>('input[name="product"]').forEach((input, index) => {
            input.addEventListener("change", () => {
                const product = input.value;
                    this.setproduct(index, product);
            });
        });
        this.cart.querySelectorAll<HTMLInputElement>('input[name="unit-price"]').forEach((input, index) => {
            input.addEventListener("change", () => {
                const unitPrice = Number(input.value);
                if (Number.isFinite(unitPrice)) {
                    this.setunit(index, unitPrice);
                }
            });
        });
               this.cart.querySelectorAll<HTMLInputElement>('input[name="quantity"]').forEach((input, index) => {
            input.addEventListener("change", () => {
                const qty = Number(input.value);
                if (Number.isFinite(qty)) {
                    this.setquantity(index, qty);
                }
            });
        });
    };

    private display(){      
        this.sum = this.getTotal();
        this.cart.innerHTML = this.tableHeader()+ this.tableBody()+ this.tableFooter();
        this.addListeners();
    }

    setproduct(i:number, val:string): void {
        this.list[i].name = val;
        this.display();
    }

    setunit(i:number, val:number): void {
        this.list[i].unit = val;
        this.display();
    }

    setquantity(i:number, val:number): void {
        this.list[i].quantity = val;
        this.display();
    }

    private tableHeader(): string{ // display table header
        return   ` 
    <form>    
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

    private tableBody(): string { // display table body
       let bodystring:string = `<tbody>` ;
       for (let i:number = 0; i< this.list.length; i++){
            bodystring += ` 
            <tr>
                <td><input type="text" name="product" value="${this.list[i].name}"></td>
                <td><input type="text" name="unit-price" value="${this.list[i].unit}"></td>
                <td><input type="text" name="quantity" value="${this.list[i].quantity}"></td>   
            </tr>
            `
       }
       bodystring = bodystring + `</tbody>`;
       return  bodystring;
    }

    private tableFooter(): string{ // display table header
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
        </form>
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

let myCart3 = new ShoppingCart3("cart", list3, 25);



