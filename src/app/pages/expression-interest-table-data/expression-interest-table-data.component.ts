import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-expression-interest-table-data',
  templateUrl: './expression-interest-table-data.component.html',
  styleUrls: ['./expression-interest-table-data.component.scss']
})
export class ExpressionInterestTableDataComponent implements OnInit {
  activeTab:string = 'EOI Project Registration';
  onTabClick(tab: string){
    this.activeTab = tab;
  }
  constructor() { }

  ngOnInit(): void {
  }
  genders: any= [
    {name: 'male', sound: 'Woof!'},
    {name: 'female', sound: 'Meow!'},
    {name: 'others', sound: 'Moo!'},
  ];
 
  serialNumber= new FormControl('', [Validators.required])
  address=new FormControl('', [Validators.required]);
  phone=new FormControl('', [Validators.required]);
  gender=new FormControl('', [Validators.required]);
  date=new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  email=new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

}
