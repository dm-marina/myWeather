import { Forecast } from "./forecast.model";

export class City{
    constructor(
        public address:string,
        public currentConditions: Forecast,
        public days:Forecast[],
        public description:string,
        public resolvedAddress:string,
        public timezone:string
    ){
        this.address = address;
        this.currentConditions = currentConditions;
        this.days=days;
        this.description = description;
        this.resolvedAddress = resolvedAddress;
        this.timezone = timezone
    }
}