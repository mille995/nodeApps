
function Weather(date, hi, low, forecast) {
this.date = date;
this.temps = new Array();
this.temps.push(hi);
this.temps.push(low);
this.forecast = forecast;
this. tempsToCelsius: function(index) {
    return (this.temps[index] - 32)/1.8;
}
}

