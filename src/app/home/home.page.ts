import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

   
  whatsapp_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'number': [
     { type: 'required', message: 'Number is required.' },
     { type: 'pattern', message: 'Enter a valid number.' }
   ]
 };

  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'WhatsApp Direct',
      message: 'Please enter Whatsapp No.',
      buttons: ['OK']
    });
    await alert.present();
 
  }

  ngOnInit(){
    this.whatsapp_form = this.formBuilder.group({
      number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im')
      ]))
    });

  //   <div class="validation-errors">
  //   <ng-container *ngFor="let validation of validation_messages.number">
  //     <div class="error-message" *ngIf="whatsapp_form.get('number').hasError(validation.type) && (whatsapp_form.get('number').dirty || whatsapp_form.get('number').touched)">
  //       {{ validation.message }}
  //     </div>
  //   </ng-container>
  // </div>

  }
 
  redirectWhatsApp(value){
    
    console.log(value);
    if (value.number) {
      this.proceedWhatsApp(value);
      } else {
      this.presentAlert();
      }
  
    // this.authService.registerUser(value)
    //  .then(res => {
    //    console.log(res);
    //    this.errorMessage = "";
    //    this.successMessage = "Your account has been created. Please log in.";
    //  }, err => {
    //    console.log(err);
    //    this.errorMessage = err.message;
    //    this.successMessage = "";
    //  })
  }

  proceedWhatsApp(value) {
    console.log('https://api.whatsapp.com/send?phone=' + value.number + '&text=');
    window.location.href='https://api.whatsapp.com/send?phone=' + value.number + '&text=';
  };

}
