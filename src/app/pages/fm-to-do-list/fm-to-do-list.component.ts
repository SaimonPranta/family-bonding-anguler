import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-fm-to-do-list',
  templateUrl: './fm-to-do-list.component.html',
  styleUrls: ['./fm-to-do-list.component.scss']
})
export class FmToDoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

}
