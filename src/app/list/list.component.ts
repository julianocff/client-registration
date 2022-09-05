import { ClientService } from './../service/client.service';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from './../models/client.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
@Injectable()
export class ListComponent implements OnInit {
  public items: Client[] = [];
  public existItems = false;
  public isLoading = false;

  public displayedColumns: string[] = [
    'cpf',
    'name',
    'age',
    'genre',
    'otherGenre',
    'height',
    'actions',
  ];

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getList().subscribe((response) => {
      this.items = response;
      this.existItems = this.items.length > 0;
      this.isLoading = false;
    });
  }

  public onEdit(item: Client) {
    this.router.navigate([`/edit/${item.cpf}`]);
  }

  public onRemove(item: Client) {
    this.service.remove(item).subscribe(() => {});
  }

  public onRemoveAll() {
    this.isLoading = true;
    this.service.removeAll().subscribe(() => {
      this.isLoading = false;
    });
  }

  private get service() {
    return this.injector.get(ClientService);
  }
}
