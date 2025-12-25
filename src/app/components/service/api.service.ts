import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basicUrl = 'https://list.orcollate.xyz/api/v1/';

  constructor(public http: HttpClient) {}

  regiseter(data: { email_mobile: string; password: string }) {
    return this.http.post(this.basicUrl + 'login', data);
  }
}
