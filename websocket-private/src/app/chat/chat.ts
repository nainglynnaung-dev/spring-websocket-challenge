import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WebsocketService } from "../service/websocket-service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="connected; else notConnected">
      <h3>Connected as {{username}}</h3>
      <input [(ngModel)]="recipient" placeholder="Recipient username">
      <input [(ngModel)]="messageContent" placeholder="Message">
      <button (click)="send()">Send</button>

      <ul>
        <li *ngFor="let msg of messages">
          <strong>{{ msg.sender }} → {{ msg.recipient }}:</strong> {{ msg.content }}
        </li>
      </ul>
    </div>
    <ng-template #notConnected>
      <p>Connecting...</p>
    </ng-template>
  `,
})
export class ChatComponent implements OnInit {
  connected = false;
  messages: any[] = [];
  recipient = '';
  messageContent = '';
  username = '';

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.wsService.connect();
    this.wsService.connected$.subscribe(status => this.connected = status);
    this.wsService.messages$.subscribe(msgs => this.messages = msgs);
  }

  send() {
    if (this.recipient && this.messageContent) {
      this.wsService.sendMessage(this.recipient, this.messageContent);
      this.messageContent = '';
    }
  }
}
