import { Component, OnInit } from '@angular/core';
import {PmvServiceService} from "../pmv-service.service";
import {Stomp} from "@stomp/stompjs";
import {Subscription} from "rxjs";
import {FormGroup,FormControl} from "@angular/forms";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  messageForm = new FormGroup({
    Emergency: new FormControl('')
  });

  content: any;
  pmv !: Message;

  constructor(public pmvService: PmvServiceService) { }

  private stompClient: any;
  private subscriptionWebsocket: Subscription = new Subscription();
  ngOnInit(): void {
    this.connect();
  }

  private connect(): void {
    console.log('[connect] BEGIN');
    this.stompClient = Stomp.client('ws://localhost:8082/chat');

    this.stompClient.connect({}, () => {
      this.subscriptionWebsocket.add(this.stompClient.subscribe('/topic/pushmessages', (event: any) => {
        this.onMessageReceived(event);
      }));
    }, (error: any) => this.errorCallBack(error));
    console.log('[connect] END');
  }

  private getMessage() {
this.pmvService.getMessage().subscribe( (result: any)=> {
  console.log(result);
})
  }

  private onMessageReceived(event: any): void {
    console.log('Begin')
    console.log('Message.ts that we got is: ' + event.body)
    this.content = event.body;
    // if (event.body == "ACCIDENT"){
    //   this.content = event.body;
    //   this.disconnect();
    // }

    // if (event.body.priority == "High"){
    //
    // }
  }

  private errorCallBack(error: any): void {
    console.log('[errorCallBack] BEGIN', error);
    this.disconnect();
    setTimeout(() => {
      this.connect();
    }, 1000);
    console.log('[errorCallBack] END');
  }

  private disconnect() {
    console.log('[disconnect] BEGIN');
    this.subscriptionWebsocket.unsubscribe();
    console.log('[disconnect] END');
  }

  onSubmit() {
    console.log(this.messageForm.value)
    this.pmvService.sendMessage(this.messageForm.value.Emergency)
      .subscribe((response: any)=>{
      });
    this.content = this.messageForm.value.Emergency;
    this.disconnect();
    this.messageForm.reset();
  }

  restart() {
    console.log("restart the thread");
    this.connect();
    location.reload();
  }
}
