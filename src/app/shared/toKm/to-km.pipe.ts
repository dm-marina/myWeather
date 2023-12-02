import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKm'
})
export class ToKmPipe implements PipeTransform {

  transform(value: number, ...args: any[]){
    return (value*1.609344).toFixed(1);
  }

}
