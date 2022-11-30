import { InjectionToken } from '@angular/core';
import {GenerationOrderPdfCommand} from "./generation-order-pdf.command";
import {Observable} from "rxjs";

export const PDF_ORDER_COMMAND_PORT = new InjectionToken<PdfOrderCommandPort>('PDF_ORDER_COMMAND_PORT');

export interface PdfOrderCommandPort {
  orderPdf(command:GenerationOrderPdfCommand):Observable<any>
}
