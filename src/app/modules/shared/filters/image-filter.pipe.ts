import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFilter'
})
export class ImageFilterPipe implements PipeTransform {

  transform(items: any[], criteria: string):any {
    if(criteria.toUpperCase() == 'all'.toUpperCase()) {
      return items;
    } 
    else {
      
    // use this when using filter with async list, categories as array
    // return items
    //   .map(items => items.filter(x => 
    //     x.category === criteria
    //   ));

      // use this when using filter with async list, categories as string ','
    return items
    .filter(x => 
      x.categories.toUpperCase().includes(criteria.toUpperCase())
    );

    // use this for using filter with old static lists
      // return items.filter(item => {
      //   return item.category === criteria;
      // });  

      // use this for using filter with old static lists
      // return items.filter(item => {
      //   return item.categories.includes(criteria.toUpperCase());
      // });  


    }
  }

}