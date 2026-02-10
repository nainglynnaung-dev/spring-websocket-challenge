import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  imports:[CommonModule,FormsModule],
  templateUrl: 'group.list.component.html'
})
export class GroupListComponent implements OnInit {

  groups: any[] = [];
  groupName: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.loading = true;

    this.groupService.getGroups().subscribe({
      next: (res: any) => {
        this.groups = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load groups';
        this.loading = false;
      }
    });
  }

  create(): void {

    if (!this.groupName.trim()) {
      this.errorMessage = 'Group name is required';
      return;
    }

    this.groupService.createGroup(this.groupName)
      .subscribe({
        next: () => {
          this.groupName = '';
          this.errorMessage = '';
          this.loadGroups();
        },
        error: () => {
          this.errorMessage = 'Failed to create group';
        }
      });
  }

  openChat(groupId: number): void {
    this.router.navigate(['/chat', groupId]);
  }

}
