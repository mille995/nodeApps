function higher(x1, x2){
    if (x1 < 40 || x1 > 60 || x2 < 40 || x2 > 60) {
        return ('Out of range');
    } 
    
    let message = x1 > x2 ? 'x1 is greater' : x2 > x1? 'x2 is greater' : 'x 1 is equal to x2' ;
    return message;
    console.log(message);
}

console.log(higher (51, 52));

