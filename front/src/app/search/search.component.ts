import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	gameName: string;
	gameResult: any[];

	constructor(private apiService: ApiService) { }

	ngOnInit() { }

	search() {
		// hack to force loading
		this.gameResult = [];
		this.apiService.searchGame(this.gameName).subscribe((data: any[]) => {
			this.gameResult = data;
		});
	}

}
