import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController
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

}
