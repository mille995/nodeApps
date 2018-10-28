

function convert(temp, toScale){
    if (toScale === 'C'){
        return(temp - 32)/1.8;
    } else if (toScale === 'F'){
        return(1.8 * temp + 32);
    } else {
        console.log("Please enter 'C' or 'F' for units");
    }
}
console.log (convert(10, 'D'));