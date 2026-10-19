function dateTime(): void {

    const output = document.getElementById("dateTime")as HTMLParagraphElement;
    output.innerHTML  = Date();
}
document.getElementById("date-button")?.addEventListener("click", dateTime);