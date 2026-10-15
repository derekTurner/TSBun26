function addNumbers(): void {

    const units: NodeListOf<HTMLElement> = document.getElementsByName("unit-price") as NodeListOf<HTMLElement>;
    const quantities: NodeListOf<HTMLElement> = document.getElementsByName("quantity") as NodeListOf<HTMLElement>;
    
    const output1 = document.getElementById("payment") as HTMLInputElement;
    const output2 = document.getElementById("discounted") as HTMLInputElement;
    let sum: number = 0;

    for (let i = 0; i < units.length; i++) {
        const unitPrice = parseFloat(units[i].textContent || "0");
        const quantity = parseFloat(quantities[i].textContent || "0");

        sum += unitPrice * quantity ;

    }
    output1.innerText = sum.toString();
    output2.innerText = (sum * 0.75).toString(); // Apply 25% discount
    console.log( sum);
}

document.getElementById("calculate-total")?.addEventListener("click", addNumbers);


