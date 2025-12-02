
import { Type } from "@google/genai";

export enum ReceiptType {
  NUBANK = 'nubank',
  PICPAY = 'picpay',
}

/**
 * Interface for NuBank Pix receipt data.
 */
export interface NuBankReceiptData {
  dateTime: string;
  value: string;
  transferType: string;
  recipientName: string;
  recipientCpf: string;
  recipientInstitution: string;
  recipientAgency: string;
  recipientAccount: string;
  recipientPixKey: string;
  senderName: string;
  senderCnpj: string;
  senderInstitution: string;
  senderAgency: string;
  senderAccount: string;
  transactionId: string;
}

/**
 * Interface for the schema definition of NuBank receipt data, used for AI generation.
 */
export interface NuBankReceiptSchema {
  type: Type.OBJECT;
  properties: {
    dateTime: { type: Type.STRING; description: string };
    value: { type: Type.STRING; description: string };
    transferType: { type: Type.STRING; description: string };
    recipientName: { type: Type.STRING; description: string };
    recipientCpf: { type: Type.STRING; description: string };
    recipientInstitution: { type: Type.STRING; description: string };
    recipientAgency: { type: Type.STRING; description: string };
    recipientAccount: { type: Type.STRING; description: string };
    recipientPixKey: { type: Type.STRING; description: string };
    senderName: { type: Type.STRING; description: string };
    senderCnpj: { type: Type.STRING; description: string };
    senderInstitution: { type: Type.STRING; description: string };
    senderAgency: { type: Type.STRING; description: string };
    senderAccount: { type: Type.STRING; description: string };
    transactionId: { type: Type.STRING; description: string };
  };
  required: string[];
}


/**
 * Interface for PicPay Pix receipt data.
 */
export interface PicPayReceiptData {
  dateTime: string;
  statusMessage: string;
  value: string;
  payeeName: string;
  payeeCnpj: string;
  payerName: string;
  payerCpf: string;
  liquidatingBank: string;
  authenticationCode: string;
  dueDate: string;
  invoiceValue: string;
  totalInvoiceValue: string;
  transactionId: string;
  barcode: string;
}

/**
 * Interface for the schema definition of PicPay receipt data, used for AI generation.
 */
export interface PicPayReceiptSchema {
  type: Type.OBJECT;
  properties: {
    dateTime: { type: Type.STRING; description: string };
    statusMessage: { type: Type.STRING; description: string };
    value: { type: Type.STRING; description: string };
    payeeName: { type: Type.STRING; description: string };
    payeeCnpj: { type: Type.STRING; description: string };
    payerName: { type: Type.STRING; description: string };
    payerCpf: { type: Type.STRING; description: string };
    liquidatingBank: { type: Type.STRING; description: string };
    authenticationCode: { type: Type.STRING; description: string };
    dueDate: { type: Type.STRING; description: string };
    invoiceValue: { type: Type.STRING; description: string };
    totalInvoiceValue: { type: Type.STRING; description: string };
    transactionId: { type: Type.STRING; description: string };
    barcode: { type: Type.STRING; description: string };
  };
  required: string[];
}

/**
 * Generic interface for form components to handle data changes.
 * @template T - The type of receipt data being edited.
 */
export interface PixReceiptFormProps<T> {
  data: T;
  onDataChange: (field: keyof T, value: string) => void;
}

/**
 * Generic interface for display components to render receipt data.
 * @template T - The type of receipt data to display.
 */
export interface PixReceiptDisplayProps<T> {
  data: T;
}
