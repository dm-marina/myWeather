export class CurrentWeatherForecast{
    constructor(
        public datetime:Date,
        public temp:number,
        public feelslike:number,
        public humidity:number,
        public windgust:number,
        public windspeed:number,
        public uvindex:number,
        public sunrise:Date,
        public sunset:Date,
        public conditions:string,
        public icon:string,
    ){
        this.datetime = datetime;
        this.temp = temp;
        this.feelslike = feelslike;
        this.humidity = humidity;
        this.windgust = windgust;
        this.windspeed = windspeed;
        this.uvindex = uvindex;
        this.sunrise = sunrise;
        this.sunset= sunset;
        this.conditions = conditions;
        this.icon = icon;
        this.feelslike = feelslike;
    }
}