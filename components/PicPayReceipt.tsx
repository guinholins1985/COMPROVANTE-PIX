import React from 'react';
import { PicPayReceiptData, PixReceiptDisplayProps } from '../types';
import { formatCpf, formatCnpj, formatCurrency, formatDateTime } from '../utils/formatters';

/**
 * PicPayReceipt component displays a formatted PicPay Pix payment receipt.
 * It takes receipt data and renders it with appropriate styling and formatting.
 */
const PicPayReceipt: React.FC<PixReceiptDisplayProps<PicPayReceiptData>> = ({ data }) => {
  const {
    dateTime,
    statusMessage,
    value,
    payeeName,
    payeeCnpj,
    payerName,
    payerCpf,
    liquidatingBank,
    authenticationCode,
    dueDate,
    invoiceValue,
    totalInvoiceValue,
    transactionId,
    barcode,
  } = data;

  /**
   * Helper component for displaying a single detail row in the receipt.
   * @param label The label for the detail (e.g., "Valor").
   * @param value The actual value to display.
   * @param largeValue Optional boolean to apply larger text styling to the value.
   */
  const DetailRow: React.FC<{ label: string; value: string; largeValue?: boolean }> = ({
    label,
    value,
    largeValue = false,
  }) => (
    <div className="flex justify-between py-1.5">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className={`${largeValue ? 'text-lg font-bold' : 'text-sm font-semibold'} text-right`}>{value}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md max-w-md w-full my-4 overflow-hidden relative">
      <div className="p-6">
        {/* PicPay Logo Section (Now inside the main padding for consistent alignment) */}
        <div className="mb-8"> {/* Adjusted margin-bottom */}
          {/* PicPay Logo as styled text */}
          <span className="text-picpayGreen font-bold text-4xl leading-none">PicPay</span> {/* Changed color to picpayGreen, removed white background */}
        </div>

        {/* Title Section (Comprovante de pagamento) */}
        <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-2">Comprovante de pagamento</h1> {/* Larger text, adjusted line-height and margin */}

        {/* Date and Time of Payment */}
        <p className="text-gray-500 text-sm mb-4">{formatDateTime(dateTime)}</p>

        {/* Status Message (e.g., "Seu pagamento foi enviado com sucesso!") */}
        {statusMessage && (
          <div className="bg-picpayGreenLight text-picpayGreenDark px-4 py-2 rounded-md flex items-center mb-6 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {statusMessage}
          </div>
        )}

        {/* Value and Liquidating Bank */}
        <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-200">
          <div>
            <span className="text-gray-600 text-sm block">Valor</span>
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(value)}</span>
          </div>
          <div>
            <DetailRow label="Banco liquidante" value={liquidatingBank} />
          </div>
        </div>

        {/* Payee, Payer and Payment Details */}
        <div className="grid grid-cols-2 gap-x-8 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Para</h2>
            <p className="text-sm font-semibold">{payeeName}</p>
            <p className="text-sm text-gray-600">{formatCnpj(payeeCnpj)}</p>

            <h2 className="text-base font-semibold text-gray-800 mt-4 mb-2">De</h2>
            <p className="text-sm font-semibold">{payerName}</p>
            <p className="text-sm text-gray-600">{formatCpf(payerCpf)}</p>
          </div>
          <div>
            <DetailRow label="Código de autenticação" value={authenticationCode} />
            <DetailRow label="Data de vencimento" value={dueDate} />
            <DetailRow label="Valor do boleto" value={formatCurrency(invoiceValue)} />
            <DetailRow label="Valor total do boleto" value={formatCurrency(totalInvoiceValue)} />
          </div>
        </div>

        {/* Transaction ID and Barcode */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <DetailRow label="ID da transação" value={transactionId} />
          <DetailRow label="Código de barras" value={barcode} />
        </div>

        {/* Footer Information */}
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <p className="text-xs text-gray-700 mb-2">
            PicPay Instituição de Pagamento S.A<br />
            CNPJ nº 22.896.431/0001-10.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Ouvidoria: 0800 025 2000 (dias úteis das 9h às 18h)<br />
            SAC: 0800 025 8000<br />
            Canais de atendimento em libras:<br />
            picpay.emlibras.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PicPayReceipt;