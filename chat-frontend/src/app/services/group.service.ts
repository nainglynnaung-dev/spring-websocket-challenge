import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class GroupService {

  private API = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  getGroups() {
    return this.http.get(this.API);
  }

  createGroup(name: string) {
    const userId = localStorage.getItem('userId');
    return this.http.post(`${this.API}?name=${name}&userId=${userId}`, {});
  }
}
