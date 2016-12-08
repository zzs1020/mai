import { Component, OnInit } from '@angular/core';
import { BtnNavService } from 'services/btn-nav/btn-nav.service';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'services/cart';
import { CustomerDeviceService } from 'services/customer-device';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
  customerDevice: any = {};
  myForm: FormGroup;
  sim: AbstractControl;

  constructor(fb: FormBuilder, private router: Router, private cartService: CartService,
              private customerDeviceService: CustomerDeviceService, public btnNavService: BtnNavService) {
    this.myForm = fb.group({
      'sim': ['']
    });
    this.sim = this.myForm.controls['sim'];
    this.sim.valueChanges.subscribe(value => {
      this.changeSim(value);
    });
  }

  saveAndGo(): void {
    this.cartService.addItem(this.customerDevice);
    this.router.navigate(['DeviceOptions']);
  }

  changeSim(sim: string): void {
    this.customerDevice.options.ICCid = sim;
  }

  ngOnInit() {
    this.btnNavService.setDesignatedButton('DeviceInfo');
    this.customerDevice = this.customerDeviceService.getCurrentCustomerDevice();
  }

}
