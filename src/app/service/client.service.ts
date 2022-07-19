import { Client } from './../models/client.model';
import { Injectable, Input } from '@angular/core';

const storageKey = 'clientsKey';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [];

  constructor() {}

  public save(data: Client) {
    this.clients.push(data);
    localStorage.setItem(storageKey, JSON.stringify(this.clients));
    return this.clients;
  }

  public getList() {
    this.clients = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return this.clients;
  }

  public remove(item: Client) {
    this.clients.splice(this.clients.indexOf(item), 1);
    localStorage.setItem(storageKey, JSON.stringify(this.clients));
    return this.clients;
  }

  public getById(id: any) {
    return this.clients.find((item) => item.cpf === id);
  }

  public edit(item: Client) {
    const client = this.clients.map((value) => {
      item.cpf === value.cpf ? (value = item) : (item = item);
      return value;
    });
    localStorage.setItem(storageKey, JSON.stringify(client));
  }

  public removeAll() {
    localStorage.clear();
    window.location.reload();
  }
}
