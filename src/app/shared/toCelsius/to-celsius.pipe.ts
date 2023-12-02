import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCelsius'
})
export class ToCelsiusPipe implements PipeTransform {

  transform(value: number, ...args: any[]){
    return ((value - 32)*(5/9)).toFixed(0);
  }

}
