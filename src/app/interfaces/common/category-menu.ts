
export interface CategoryMenu {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  hasChild: HasChild[];
  iconType?: string;
  iconName?: string;
  priority?: number;
}


export interface HasChild {
  id: string;
  name: string;
  slug: string;
  hasChild: HasChild2[];
  priority?: number;
  iconType?: string;
  iconName?: string;
}


export interface HasChild2 {
  id: string;
  slug: string;
  name: string;
  hasChild: any[];
  priority?: number;
  iconType?: string;
  iconName?: string;
}

