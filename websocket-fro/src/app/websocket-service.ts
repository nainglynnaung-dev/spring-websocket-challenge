import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;

  public connected$ = new BehaviorSubject<boolean>(false);
  public messages$ = new BehaviorSubject<any[]>([]);

  connect() {
    this.stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('Connected...');
      this.connected$.next(true);

      this.stompClient.subscribe('/topic/messages', (message: any) => {
        const parsed = JSON.parse(message.body);
        console.log(parsed);

        // Push new message into BehaviorSubject
        this.messages$.next([...this.messages$.value, parsed]);
      });
    };

    this.stompClient.onDisconnect = () => {
      this.connected$.next(false);
    };

    this.stompClient.activate();
  }

  sendMessage(sender: string, content: string) {
    if (this.connected$.value) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify({ sender, content }),
      });
    } else {
      console.warn('Not connected yet!');
    }
  }
}
