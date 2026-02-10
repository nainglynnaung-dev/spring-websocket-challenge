import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private stompClient!: Client;
  messages$ = new BehaviorSubject<any[]>([]);
  connected$ = new BehaviorSubject<boolean>(false);

  connect() {
    this.stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = () => {
      this.connected$.next(true);

      this.stompClient.subscribe('/user/queue/messages', (message: any) => {
        const parsed = JSON.parse(message.body);
        this.messages$.next([...this.messages$.value, parsed]);
      });
    };

    this.stompClient.onDisconnect = () => {
      this.connected$.next(false);
    };

    this.stompClient.activate(); // ✅ start connection immediately
  }

  sendMessage(recipient: string, content: string) {
    this.stompClient.publish({
      destination: '/app/chat.sendToUser', // ✅ must match backend @MessageMapping
      body: JSON.stringify({ recipient, content })
    });
  }
}
