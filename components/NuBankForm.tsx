
import React from 'react';
import { NuBankReceiptData, PixReceiptFormProps } from '../types';
import Input from './Input';

/**
 * NuBankForm component provides input fields for creating or editing NuBank Pix receipt data.
 * It uses the generic PixReceiptFormProps to manage data state.
 */
const NuBankForm: React.FC<PixReceiptFormProps<NuBankReceiptData>> = ({ data, onDataChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Dados da Transferência</h2>
      <Input
        label="Data e Hora (AAAA-MM-DDTHH:MM)"
        id="dateTime"
        type="datetime-local" // Use datetime-local for native date/time picker
        value={data.dateTime}
        onChange={(e) => onDataChange('dateTime', e.target.value)}
      />
      <Input
        label="Valor (apenas números, ex: 2300 para R$23,00)"
        id="value"
        type="number" // Use number type for numerical input
        value={data.value}
        onChange={(e) => onDataChange('value', e.target.value)}
      />
      <Input
        label="Tipo de Transferência"
        id="transferType"
        value={data.transferType}
        onChange={(e) => onDataChange('transferType', e.target.value)}
      />

      <h2 className="text-lg font-semibold text-gray-800 mt-6">Dados do Destino</h2>
      <Input
        label="Nome do Destinatário"
        id="recipientName"
        value={data.recipientName}
        onChange={(e) => onDataChange('recipientName', e.target.value)}
      />
      <Input
        label="CPF do Destinatário (apenas números)"
        id="recipientCpf"
        type="tel" // Use tel for numerical input that might involve special characters like dots/dashes
        maxLength={11} // Max length for CPF digits
        value={data.recipientCpf}
        onChange={(e) => onDataChange('recipientCpf', e.target.value.replace(/\D/g, ''))} // Store only digits
      />
      <Input
        label="Instituição do Destinatário"
        id="recipientInstitution"
        value={data.recipientInstitution}
        onChange={(e) => onDataChange('recipientInstitution', e.target.value)}
      />
      <Input
        label="Agência do Destinatário"
        id="recipientAgency"
        value={data.recipientAgency}
        onChange={(e) => onDataChange('recipientAgency', e.target.value)}
      />
      <Input
        label="Conta do Destinatário"
        id="recipientAccount"
        value={data.recipientAccount}
        onChange={(e) => onDataChange('recipientAccount', e.target.value)}
      />
      <Input
        label="Chave Pix do Destinatário"
        id="recipientPixKey"
        value={data.recipientPixKey}
        onChange={(e) => onDataChange('recipientPixKey', e.target.value)}
      />

      <h2 className="text-lg font-semibold text-gray-800 mt-6">Dados da Origem</h2>
      <Input
        label="Nome do Remetente"
        id="senderName"
        value={data.senderName}
        onChange={(e) => onDataChange('senderName', e.target.value)}
      />
      <Input
        label="CNPJ do Remetente (apenas números)"
        id="senderCnpj"
        type="tel" // Use tel for numerical input that might involve special characters like dots/dashes
        maxLength={14} // Max length for CNPJ digits
        value={data.senderCnpj}
        onChange={(e) => onDataChange('senderCnpj', e.target.value.replace(/\D/g, ''))} // Store only digits
      />
      <Input
        label="Instituição do Remetente"
        id="senderInstitution"
        value={data.senderInstitution}
        onChange={(e) => onDataChange('senderInstitution', e.target.value)}
      />
      <Input
        label="Agência do Remetente"
        id="senderAgency"
        value={data.senderAgency}
        onChange={(e) => onDataChange('senderAgency', e.target.value)}
      />
      <Input
        label="Conta do Remetente"
        id="senderAccount"
        value={data.senderAccount}
        onChange={(e) => onDataChange('senderAccount', e.target.value)}
      />

      <h2 className="text-lg font-semibold text-gray-800 mt-6">Outros Dados</h2>
      <Input
        label="ID da Transação"
        id="transactionId"
        value={data.transactionId}
        onChange={(e) => onDataChange('transactionId', e.target.value)}
      />
    </div>
  );
};

export default NuBankForm;
