import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {OrderDto} from "./order.dto";

export const INVOICE_PDF_DTO_PORT = new InjectionToken<InvoicePdfDtoPort>('INVOICE_PDF_DTO_PORT');

export interface InvoicePdfDtoPort {
  invoice(order:OrderDto): Observable<any>;
}
