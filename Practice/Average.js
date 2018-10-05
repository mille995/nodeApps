let boo = [5, 56 , 9, 48];
Array.prototype.average = function(){
    let total = 0;
    this.forEach(item => {
        total += item;
    });

    return total/this.length;
}
console.log(boo.average());