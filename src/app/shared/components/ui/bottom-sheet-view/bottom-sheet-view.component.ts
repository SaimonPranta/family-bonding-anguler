import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-view',
  templateUrl: './bottom-sheet-view.component.html',
  styleUrls: ['./bottom-sheet-view.component.scss']
})
export class BottomSheetViewComponent implements OnInit {

  message: string;
  btnName: string;
  routerLink: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetViewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}


  ngOnInit() {
    if (this.data) {
      this.message = this.data.message;
      this.btnName = this.data.btnName;
      this.routerLink = this.data.routerLink;
    }
    if (this.data.timeOut) {
      setTimeout(() => {
        this.bottomSheetRef.dismiss();
      }, this.data.timeOut);
    }
  }


  clearBar(): void {
    this.bottomSheetRef.dismiss({
      message: 'Cancel',
      data: this.data
    });
    event.preventDefault();
  }

  changeStatus() {
    this.bottomSheetRef.dismiss({
      routerLink: this.routerLink
    });
  }


}
