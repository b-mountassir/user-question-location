import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/front/session-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.userData = JSON.parse(this.sessionStorageService.getKey('USER'));
  }

}
