import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model'
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

tasks: Task[] = []

  constructor(
    private firebaseSvc: FirebaseService, 
    private utilsSvc: UtilsService 
  ) { }

  ngOnInit() {
    // this.addOrUpdateTask(this.tasks[0]);
  }

  ionViewWillEnter() {
    this.getTasks()
  }

  getPercentage(task: Task){
    return this.utilsSvc.getPercentage(task);
  }

  async addOrUpdateTask(task?: Task){
    let res = await this.utilsSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: {task},
      cssClass: 'add-update-modal'
    })
    if (res && res.success){
      this.getTasks()
    }
  }

  getTasks(){
    let user : User = this.utilsSvc.getElementFromLocalStorage('user');
    let path = `user/${user.uid}`

    let sub = this.firebaseSvc.getSubCollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        console.log(res);
        this.tasks = res;
        sub.unsubscribe();
      }
    })
  }

}
