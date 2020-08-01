import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public searchGame(gameName){  
		return this.httpClient.get(this.SERVER_URL + "?title="+ gameName);  
	}  
}
