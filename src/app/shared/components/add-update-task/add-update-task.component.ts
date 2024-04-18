import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {

  @Input() task: Task;
  constructor() { }

  ngOnInit() {}

}
