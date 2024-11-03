export class TaskItem {
    id: string = '';
    title: string = '';
    description: string = '';
    status: 'To Do' | 'In Progress' | 'Done' = 'To Do';
    category: string = '';
    date: Date = new Date();
    endTime: Date = new Date();
  
    constructor(
      id: string,
      title: string,
      description: string,
      status: 'To Do' | 'In Progress' | 'Done', // updated type
      category: string,
      date: Date,
      endTime: Date
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = status;
      this.category = category;
      this.date = date;
      this.endTime = endTime;
    }
  }
  