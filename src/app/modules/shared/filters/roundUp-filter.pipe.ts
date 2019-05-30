import {Pipe} from '@angular/core';

@Pipe({name: 'roundUp'})
export class RoundUpPipe {
  transform (input:number) {
    return Math.ceil(input);
  }
}