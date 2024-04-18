import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }
// =============== Loading ===============
// Present
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }
//Dissmis
  async dismissLoading(){
    return await this.loadingController.dismiss()
  }

// =============== LocalStorage ===============
// SET
  setElementInLocalStorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element));
  }
//GET
  getElementFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

// =============== Router ===============
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

// =============== Alert ===============
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
  
    await alert.present();
  }

// =============== Modal ===============
//Present modal
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const {data}= await modal.onWillDismiss();
    if (data){
      return data;
    }
  }
//Dismiss modal
  dismissModal(data?: any){
    this.modalController.dismiss(data);
  }
//Present modal
getPercentage(task: Task){
  let competedItems = task.items.filter( item => item.completed).length;
  let totalItems = task.items.length;
  let percentage = (100 / totalItems) * competedItems;
  
  return parseInt(percentage.toString());
}

}
