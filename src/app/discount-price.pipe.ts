import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): number {
    let discountedPrice = price - (price * discountPercentage / 100);
    return parseFloat(discountedPrice.toFixed(2));

  }

}

