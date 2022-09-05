import { ListComponent } from './../list/list.component';
import { RegistrationComponent } from './../registration/registration.component';
import { map, tap } from 'rxjs/operators';
import { Client } from './../models/client.model';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

const storageKey = 'clientsKey';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [];

  constructor(private registrationComponent: RegistrationComponent) {}

  public save(data: Client): Observable<Client> {
    return new Observable((subscriber) => {
      this.clients.find((cpf) => {
        if (cpf.cpf === data.cpf) {
          this.registrationComponent.redirectToList();
          return;
        }
      });
      setTimeout(() => {
        this.clients.push(data);
        localStorage.setItem(storageKey, JSON.stringify(this.clients));
        subscriber.next(data);
      }, 1000);
    });
  }

  public getList(): Observable<Client[]> {
    return new Observable((subscriber) => {
      setTimeout(() => {
        this.clients = JSON.parse(localStorage.getItem(storageKey) || '[]');
        subscriber.next(this.clients);
      }, 1000);
    });
  }

  public remove(item: Client) {
    return new Observable((subscriber: Subscriber<any>) => {
      this.clients.splice(this.clients.indexOf(item), 1);
      localStorage.setItem(storageKey, JSON.stringify(this.clients));
      subscriber.next(this.clients);
      subscriber.next(window.location.reload());
    });
  }

  public getById(id: any) {
    return new Observable((subscriber: Subscriber<any>) => {
      setTimeout(() => {
        subscriber.next(this.clients.find((item) => item.cpf === id));
      }, 1000);
    });
  }

  public edit(item: Client) {
    return new Observable((subscriber) => {
      setTimeout(() => {
        const client = this.clients.map((value) => {
          if (item.cpf === value.cpf) value = item;
          return value;
        });
        subscriber.next(
          localStorage.setItem(storageKey, JSON.stringify(client))
        );
      }, 1000);
    });
  }

  public removeAll() {
    return new Observable((subscriber) => {
      setTimeout(() => {
        localStorage.clear();
        subscriber.next(window.location.reload());
      }, 1000);
    });
  }
}
