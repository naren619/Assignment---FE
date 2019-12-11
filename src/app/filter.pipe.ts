import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterSearch: number, propName: number) { 
    const resultArray = []; 
    if(value.length == 0 || filterSearch == 0){
      return value;
    }
    for (const item of value){ 
      if(Number(filterSearch) >= Number(item[propName])){ 
        resultArray.push(item)
      }
    }
    // for(var i=0;i<value.length;i++){
    //   if(Number(filterSearch) >= Number(value[i][propName])){ 
    //     resultArray.push(value[i]) 
    //   }
    // }
    return resultArray;
  }

}
