export class Forecast{
    constructor(
        public datetime:Date,
        public tempmax:number,
        public tempmin:number,
        public temp:number,
        public feelslikemin:number,
        public feelslikemax:number,
        public humidity:number,
        public windgust:number,
        public windspeed:number,
        public visibility:number,
        public uvindex:number,
        public sunrise:Date,
        public sunset:Date,
        public conditions:string,
        public description:string,
        public icon:string,
        public name:string,
        public feelslike:number
    ){
        this.datetime = datetime;
        this.tempmax = tempmax;
        this.tempmin = tempmin;
        this.temp = temp;
        this.feelslikemin = feelslikemin;
        this.feelslikemax = feelslikemax;
        this.humidity = humidity;
        this.windgust = windgust;
        this.windspeed = windspeed;
        this.visibility = visibility;
        this.uvindex = uvindex;
        this.sunrise = sunrise;
        this.sunset= sunset;
        this.conditions = conditions;
        this.description = description;
        this.icon = icon;
        this.name = name;
        this.feelslike = feelslike;
    }
}