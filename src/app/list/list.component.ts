import { Router } from '@angular/router';
import { Client } from './../models/client.model';
import { ClientService } from './../service/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public items = this.service.getList();
  public existItems = this.items.length > 0 ? true : false;

  constructor(private service: ClientService, private router: Router) {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'cpf',
    'name',
    'age',
    'genre',
    'otherGenre',
    'height',
    'actions',
  ];
  dataSource = this.items;

  public onEdit(item: Client) {
    this.router.navigate([`/edit/${item.cpf}`]);
  }

  public onRemove(item: Client) {
    this.service.remove(item);
    this.dataSource = [...this.items];
  }

  public onRemoveAll() {
    this.service.removeAll();
  }
}
