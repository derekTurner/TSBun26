function Game (this: { name: string; release: string; genre: string }, name:string, release:string, genre:string) {
		this.name = name;
		this.release = release;
		this.genre = genre;
	}




const game1 = {
    name: "TheGame",
    release: "2023",
    genre: "Adventure",
    fullGameDetails(): string {
        return this.name + " " + this.release + " " + this.genre;
    }
};
const x: typeof game1 = game1;
x.name = "new";
console.log(game1.name, x.name)



let output3 = game1.fullGameDetails();

let output4 = game1.name;

let output5 = game1.platform;

let game4:{ [key: string]: any } = {};
game4.name = "TheGame";
game4.release = "2027";
game4.genre = "Adventure";

