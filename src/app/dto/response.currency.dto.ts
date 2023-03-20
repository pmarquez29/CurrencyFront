import { QueryDto } from "./query.dto";

export interface ResponseCurrencyDto {
    success: boolean;
    query: QueryDto,
    date: string;
    result: number;
}