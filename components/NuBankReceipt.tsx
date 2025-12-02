import React from 'react';
import { NuBankReceiptData, PixReceiptDisplayProps } from '../types';
import { formatCpf, formatCnpj, formatCurrency, formatDateTime } from '../utils/formatters';

/**
 * NuBankReceipt component displays a formatted NuBank Pix transfer receipt.
 * It takes receipt data and renders it with appropriate styling and formatting.
 */
const NuBankReceipt: React.FC<PixReceiptDisplayProps<NuBankReceiptData>> = ({ data }) => {
  const {
    dateTime,
    value,
    transferType,
    recipientName,
    recipientCpf,
    recipientInstitution,
    recipientAgency,
    recipientAccount,
    recipientPixKey,
    senderName,
    senderCnpj,
    senderInstitution,
    senderAgency,
    senderAccount,
    transactionId,
  } = data;

  /**
   * Helper component for displaying a single detail row in the receipt.
   * @param label The label for the detail (e.g., "Valor").
   * @param value The actual value to display.
   */
  const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-sm text-right">{value}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md max-w-md w-full my-4 overflow-hidden relative">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8"> {/* Increased bottom margin to match spacing */}
          {/* NuBank Logo as styled text */}
          <span className="text-gray-900 font-bold text-4xl mb-4 block leading-none">nu</span> {/* Changed color to dark gray, adjusted margin and line-height */}
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">Comprovante de<br />transferência</h1> {/* Larger text, adjusted line-height */}
        </div>

        {/* Date and Time of Transfer */}
        <p className="text-gray-500 text-sm mb-6">{formatDateTime(dateTime)}</p>

        {/* Transaction Summary: Value and Type */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <DetailRow label="Valor" value={formatCurrency(value)} />
          <DetailRow label="Tipo de transferência" value={transferType || 'Pix'} />
        </div>

        {/* Destination (Recipient) Details */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Destino</h2>
        <div className="mb-6 pb-4 border-b border-gray-200">
          <DetailRow label="Nome" value={recipientName} />
          <DetailRow label="CPF" value={formatCpf(recipientCpf)} />
          <DetailRow label="Instituição" value={recipientInstitution} />
          <DetailRow label="Agência" value={recipientAgency} />
          <DetailRow label="Conta" value={recipientAccount} />
          <DetailRow label="Chave Pix" value={recipientPixKey} />
        </div>

        {/* Origin (Sender) Details */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Origem</h2>
        <div className="mb-6 pb-4 border-b border-gray-200">
          <DetailRow label="Nome" value={senderName} />
          <DetailRow label="CNPJ" value={formatCnpj(senderCnpj)} />
          <DetailRow label="Instituição" value={senderInstitution} />
          <DetailRow label="Agência" value={senderAgency} />
          <DetailRow label="Conta" value={senderAccount} />
        </div>

        {/* Footer Information */}
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <p className="text-xs text-gray-700 mb-2">
            Nu Pagamentos S.A. - Instituição de Pagamento<br />
            CNPJ 18.236.120/0001-58
          </p>
          <p className="text-xs text-gray-700 mb-2 font-bold">
            ID da transação: {transactionId}
          </p>
          <p className="text-xs text-gray-600 mb-4">
            Estamos aqui para ajudar se você tiver alguma dúvida.
          </p>
          <a href="#" className="flex items-center text-nubankPurple text-xs font-semibold">
            Me ajuda
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-xs text-gray-500 mt-4">
            Ouvidoria: 0800 887 0463 | ouvidoria@nubank.com.br<br />
            (Atendimento das 8h às 18h em dias úteis).
          </p>
        </div>
      </div>
    </div>
  );
};

export default NuBankReceipt;