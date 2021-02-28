import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoadingModalComponent} from '../util/modal/loading-modal/loading-modal.component';

/**
 * Created by Usuario on 02/06/2017.
 */
@Injectable()
export class Util {
  constructor(
    public router: Router,
    public dialog: MatDialog
  ) {
      this.url = environment.url;
      this.apiPrefix = environment.apiPrefix;
      this.version = '1.0.0';
  }

  public constants;
  public url: string;
  public apiPrefix: string;
  public version: string;


    public static savePreference(key: string, value: any) {
    localStorage.setItem(key, value);
  }

    public getPreference(key): any {
    return localStorage.getItem(key);
  }

    public static clearAllData() {
    localStorage.clear();
  }

  public async showToast(message: string) {
      // const toast = await this.toastCtrl.create({
      //     message,
      //     duration: 3000,
      //     position: 'bottom'
      // });
      // toast.present();
      // return toast;

  }

  public showDialog(msg: string, showDialog = true): MatDialogRef<any> {
    let dialogRef = null;



    if (showDialog) {
      dialogRef = this.dialog.open(LoadingModalComponent, {
        data: {
          title: 'Loading',
          message: 'Message',
          keyboardClose: false
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    return dialogRef;

  }



  public logOut() {
      Util.clearAllData();
      this.router.navigateByUrl('/');
  }
}
