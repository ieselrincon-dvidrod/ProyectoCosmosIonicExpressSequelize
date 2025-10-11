import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {

  private endpoint = 'http://localhost:8080/api/gimnasios';

  constructor(private http: HttpClient) {}

  getGimnasios() {
    return this.http.get(this.endpoint);
  }


create(gimnasio: any) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.endpoint, gimnasio, { headers });
}
  
  
  deleteGimnasio(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
}

}
