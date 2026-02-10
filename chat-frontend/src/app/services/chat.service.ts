import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private socket!: WebSocket;
  private messageCallback: any;

  connect(groupId: number, callback: any) {
    this.messageCallback = callback;

    // Connect to backend WebSocket endpoint
    this.socket = new WebSocket(`ws://localhost:8080/ws/chat/${groupId}`);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (this.messageCallback) {
        this.messageCallback(msg);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
      // Optionally, try reconnect
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(groupId: number, content: string) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    const userId = localStorage.getItem('userId');

    const msg = {
      message: content,
      user: { id: userId },
      group: { id: groupId }
    };

    this.socket.send(JSON.stringify(msg));
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
