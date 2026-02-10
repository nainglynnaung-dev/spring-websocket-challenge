import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],   // 👈 this makes *ngIf and *ngFor available
  template: `
    <div *ngIf="connected; else notConnected">
      <h3>Connected!</h3>
      <ul>
        <li *ngFor="let msg of messages">
          {{ msg.sender }}: {{ msg.content }}
        </li>
      </ul>
    </div>
    <ng-template #notConnected>
      <p>Connecting...</p>
    </ng-template>
    <button (click)="send()">Send Test</button>
  `,
})
export class ChatComponent implements OnInit {
  connected = false;
  messages: any[] = [];

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.wsService.connect();

    this.wsService.connected$.subscribe((status) => {
      this.connected = status;
    });

    this.wsService.messages$.subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  send() {
    this.wsService.sendMessage('me', 'Hello world');
  }
}
