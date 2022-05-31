export function keyGenerator(width:number, chars:string) {
    let key = "";
    for (let i = 0; i < width; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}
