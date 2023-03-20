import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { ResponseCurrencyDto } from './dto/response.currency.dto';
import { CurrencyService } from './service/currency.service';
import {ListDto} from "./dto/list.dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'software';
  test = 'prueba';

  currencyForm: FormGroup;
  responseCurrencyDto: ResponseCurrencyDto;

  data: ListDto[];
  page: number = 0;
  totalPage: number = 0;

  ngOnInit(): void {
    this.currencyService.getCurrencyList().subscribe({
      next: (data:any) => {
        console.log("invocacion exitosa");
        console.log(data);
        this.data = data.content;
        this.page = data.pageable.pageNumber;
        this.totalPage = data.totalPages;
      },
      error: error => console.error('ERROR >>>>', error)
    })
  }


  constructor(private formBuilder: FormBuilder, private currencyService: CurrencyService) {
    this.currencyForm = this.formBuilder.group({
      from: '',
      to: '',
      amount: ''
    });
  }

  submit() {
    console.log(this.currencyForm.value);
    console.log("enviroment API_KEY:", environment.API_KEY);
    this.currencyService.convertCurrency(this.currencyForm.value.from,
      this.currencyForm.value.to,
      this.currencyForm.value.amount).subscribe({
        next: (data) => {
          console.log("invocacion exitosa");
          console.log(data);
          this.responseCurrencyDto = data;
          console.log("resultado");
          console.log(this.responseCurrencyDto.result);
        },
        error: error => console.error('ERROR >>>>', error)
      })
    console.log('test');
  }
}
