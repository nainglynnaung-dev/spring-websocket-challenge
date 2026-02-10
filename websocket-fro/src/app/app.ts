import { Component, signal } from '@angular/core';
import { ChatComponent } from "./chat-component/chat-component";

@Component({
  selector: 'app-root',
  imports: [ChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('websocket-fro');
}
