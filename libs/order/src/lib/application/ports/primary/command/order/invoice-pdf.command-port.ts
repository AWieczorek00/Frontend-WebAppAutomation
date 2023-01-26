import { InjectionToken } from '@angular/core';
import {GenerationOrderPdfCommand} from "./generation-order-pdf.command";
import {Observable} from "rxjs";

export const INVOICE_PDF_COMMAND_PORT = new InjectionToken<InvoicePdfCommandPort>('INVOICE_PDF_COMMAND_PORT');

export interface InvoicePdfCommandPort {

  InvoicePdf(command:GenerationOrderPdfCommand):Observable<any>

}
