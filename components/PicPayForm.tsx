
import React from 'react';
import { PicPayReceiptData, PixReceiptFormProps } from '../types';
import Input from './Input';

/**
 * PicPayForm component provides input fields for creating or editing PicPay Pix receipt data.
 * It uses the generic PixReceiptFormProps to manage data state.
 */
const PicPayForm: React.FC<PixReceiptFormProps<PicPayReceiptData>> = ({ data, onDataChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Dados do Pagamento</h2>
      <Input
        label="Data e Hora (AAAA-MM-DDTHH:MM)"
        id="dateTime"
        type="datetime-local" // Use datetime-local for native date/time picker
        value={data.dateTime}
        onChange={(e) => onDataChange('dateTime', e.target.value)}
      />
      <Input
        label="Mensagem de Status"
        id="statusMessage"
        value={data.statusMessage}
        onChange={(e) => onDataChange('statusMessage', e.target.value)}
      />
      <Input
        label="Valor (apenas números, ex: 53839 para R$538,39)"
        id="value"
        type="number" // Use number type for numerical input
        value={data.value}
        onChange={(e) => onDataChange('value', e.target.value)}
      />

      <h2 className="text-lg font-semibold text-gray-800 mt-6">Dados do Beneficiário ('Para')</h2>
      <Input
        label="Nome do Beneficiário"
        id="payeeName"
        value={data.payeeName}
        onChange={(e) => onDataChange('payeeName', e.target.value)}
      />
      <Input
        label="CNPJ do Beneficiário (apenas números)"
        id="payeeCnpj"
        type="tel" // Use tel for numerical input that might involve special characters like dots/dashes
        maxLength={14} // Max length for CNPJ digits
        value={data.payeeCnpj}
        onChange={(e) => onDataChange('payeeCnpj', e.target.value.replace(/\D/g, ''))} // Store only digits
      />

      <h2 className="text-lg font-semibold text-gray-800 mt-6">Dados do Pagador ('De')</h2>
      <Input
        label="Nome do Pagador"
        id="payerName"
        value={data.payerName}
        onChange={(e) => onDataChange('payerName', e.target.value)}
      />
      <Input
        label="CPF do Pagador (apenas números)"
        id="payerCpf"
        type="tel" // Use tel for numerical input that might involve special characters like dots/dashes
        maxLength={11} // Max length for CPF digits
        value={data.payerCpf}
        onChange={(e) => onDataChange('payerCpf', e.target.value.replace(/\D/g, ''))} // Store only digits
      />

      <h2 className="text-lg font-semibold text-gray-800 mt-6">Detalhes Adicionais</h2>
      <Input
        label="Banco Liquidante"
        id="liquidatingBank"
        value={data.liquidatingBank}
        onChange={(e) => onDataChange('liquidatingBank', e.target.value)}
      />
      <Input
        label="Código de Autenticação"
        id="authenticationCode"
        value={data.authenticationCode}
        onChange={(e) => onDataChange('authenticationCode', e.target.value)}
      />
      <Input
        label="Data de Vencimento (DD/MM/AAAA)"
        id="dueDate"
        value={data.dueDate}
        onChange={(e) => onDataChange('dueDate', e.target.value)}
      />
      <Input
        label="Valor do Boleto (apenas números, ex: 53839)"
        id="invoiceValue"
        type="number" // Use number type for numerical input
        value={data.invoiceValue}
        onChange={(e) => onDataChange('invoiceValue', e.target.value)}
      />
      <Input
        label="Valor Total do Boleto (apenas números, ex: 53839)"
        id="totalInvoiceValue"
        type="number" // Use number type for numerical input
        value={data.totalInvoiceValue}
        onChange={(e) => onDataChange('totalInvoiceValue', e.target.value)}
      />
      <Input
        label="ID da Transação"
        id="transactionId"
        value={data.transactionId}
        onChange={(e) => onDataChange('transactionId', e.target.value)}
      />
      <Input
        label="Código de Barras"
        id="barcode"
        value={data.barcode}
        onChange={(e) => onDataChange('barcode', e.target.value)}
      />
    </div>
  );
};

export default PicPayForm;
