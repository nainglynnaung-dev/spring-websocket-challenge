import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  imports:[FormsModule,CommonModule],
  templateUrl: './chat-room.component.html'
})
export class ChatRoomComponent implements OnInit {

  groupId!: number;
  messages: any[] = [];
  text: string = '';
  userId: number = Number(localStorage.getItem('userId'));
  loading: boolean = false;

  private API = 'http://localhost:8080/api/groups';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadOldMessages();

    this.chatService.connect(this.groupId, (msg: any) => {
      this.messages.push(msg);
      this.scrollToBottom();
    });
  }

  loadOldMessages(): void {
    this.loading = true;

    this.http.get<any[]>(`${this.API}/${this.groupId}/messages`)
      .subscribe({
        next: (res) => {
          this.messages = res;
          this.loading = false;
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  send(): void {

    if (!this.text.trim()) return;

    this.chatService.sendMessage(this.groupId, this.text);
    this.text = '';
  }

  isMyMessage(msg: any): boolean {
    return msg.user?.id === this.userId;
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const container = document.getElementById('chatContainer');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }

//   ngOnDestroy(): void {
//     this.chatService.disconnect();
//   }
}
