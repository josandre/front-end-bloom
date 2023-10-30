import { formatDate } from '@angular/common';
export class Room {
  id: number;
  img: string;
  pName: string;
  rNo: string;
  rType: string;
  gender: string;
  admitDate: string;
  dischargeDate: string;
  constructor(room: Room) {
    {
      this.id = room.id || this.getRandomID();
      this.img = room.img || 'assets/images/user/user1.jpg';
      this.pName = room.pName || '';
      this.rNo = room.rNo || '';
      this.rType = room.rType || '';
      this.gender = room.gender || '';
      this.admitDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.dischargeDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
