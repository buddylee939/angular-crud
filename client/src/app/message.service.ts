import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly notifier: NotifierService;

  constructor(
    notifierService: NotifierService
  ) {
      this.notifier = notifierService;
  }


  add(message: string, status: string) {
    this.notifier.notify(status, message);
  }
}

