import { Component } from '@angular/core';
import {ListDto} from "../dto/list.dto";
import {CurrencyService} from "../service/currency.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  listDto: ListDto[];
  page: number = 0;
  totalPage: number = 0;

  constructor(private currencyService: CurrencyService) {

  }
  ngOnInit(): void {
    this.currencyService.getCurrencyList().subscribe({
      next: data => {
        this.listDto = data.content;
        this.totalPage = data.totalPages;
      }
    })
  }
  displayColumns: string[] = ['id', 'from', 'to', 'amount', 'date', 'result'];
}
