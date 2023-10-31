import { formatDate } from '@angular/common';
export class ItemStockList {
  id: number;
  i_name: string;
  category: string;
  qty: string;
  date: string;
  price: string;
  details: string;
  constructor(itemStockList: ItemStockList) {
    {
      this.id = itemStockList.id || this.getRandomID();
      this.i_name = itemStockList.i_name || '';
      this.category = itemStockList.category || '';
      this.qty = itemStockList.qty || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.price = itemStockList.price || '';
      this.details = itemStockList.details || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
