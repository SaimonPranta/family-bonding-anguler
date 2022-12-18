import {Component, Input, OnInit} from '@angular/core';
import {CategoryMenu, HasChild} from '../../../../../interfaces/common/category-menu';

@Component({
  selector: 'app-menu-hover-content',
  templateUrl: './menu-hover-content.component.html',
  styleUrls: ['./menu-hover-content.component.scss']
})
export class MenuHoverContentComponent implements OnInit {

  @Input() parentCategory: CategoryMenu = null;
  @Input() data: HasChild[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
