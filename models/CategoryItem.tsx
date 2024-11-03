export class CategoryItem {
    id: string;
    name: string;
  
    constructor(name: string) {
      this.id = Date.now().toString(); // Unique ID for the category
      this.name = name;
    }
  }