
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: false
})
export class SplashPage implements OnInit, OnDestroy {

  private timer: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, 3000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
