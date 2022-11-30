import { InjectionToken } from '@angular/core';
import {OrderDto} from "./order.dto";
import {Observable} from "rxjs";

export const ORDER_PDF_DTO_PORT = new InjectionToken<OrderPdfDtoPort>('ORDER_PDF_DTO_PORT');

export interface OrderPdfDtoPort {
  orderPdf(order:OrderDto):Observable<any>
}
