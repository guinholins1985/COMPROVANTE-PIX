
import React, { useState } from 'react';
import { NuBankReceiptData, PicPayReceiptData, ReceiptType, NuBankReceiptSchema, PicPayReceiptSchema } from './types';
import NuBankReceipt from './components/NuBankReceipt';
import PicPayReceipt from './components/PicPayReceipt';
import NuBankForm from './components/NuBankForm';
import PicPayForm from './components/PicPayForm';
import Input from './components/Input';
import { GoogleGenAI, Type } from "@google/genai";

/**
 * App component serves as the root of the Pix Receipt Generator application.
 * It manages the selection between NuBank and PicPay receipt types and their respective data,
 * providing a dynamic form and real-time receipt preview.
 */
const App: React.FC = () => {
  // State to control which receipt type is currently selected for editing and display.
  const [currentReceiptType, setCurrentReceiptType] = useState<ReceiptType>(ReceiptType.NUBANK);

  // Helper function to get the current date and time in a format suitable for datetime-local input.
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // State for NuBank receipt data, initialized with example data.
  const [nuBankData, setNuBankData] = useState<NuBankReceiptData>({
    dateTime: getCurrentDateTime(),
    value: '5500', // Example: R$55.00 for a phone bill
    transferType: 'Pix',
    recipientName: 'Claro S.A.',
    recipientCpf: '12345678900', // Example CPF, only digits
    recipientInstitution: 'Operadora Claro',
    recipientAgency: '0001',
    recipientAccount: '987654321-0',
    recipientPixKey: '+5511999998888', // Example phone number as Pix key
    senderName: 'LISBOAPAY FACILITADORA DE PAGAMENTOS LTDA',
    senderCnpj: '41433374000188', // Example CNPJ, only digits
    senderInstitution: 'PROTOTYPE IP S.A.',
    senderAgency: '0001',
    senderAccount: '1108-1',
    transactionId: 'F12345678902502130218161426338ab', // Updated transaction ID
  });

  // State for PicPay receipt data, initialized with example data.
  const [picPayData, setPicPayData] = useState<PicPayReceiptData>({
    dateTime: getCurrentDateTime(),
    statusMessage: 'Seu pagamento foi enviado com sucesso!',
    value: '53839', // Example: 538.39 BRL
    payeeName: 'CONSELHO REGIONAL DE ENGENHARIA E AGRONOMIA',
    payeeCnpj: '17254509000163', // Example CNPJ, only digits
    payerName: 'Gustavo Andrade',
    payerCpf: '12341331600', // Example CPF, only digits
    liquidatingBank: 'PicPay Bank',
    authenticationCode: 'O código estará disponível após a liquidação',
    dueDate: '31/jan/2025',
    invoiceValue: '53839',
    totalInvoiceValue: '53839',
    transactionId: 'eb0c0b8e-e725-4f40-b5bf-0f47ed1758c8',
    barcode: '00190000090283213486606315732179199780000053839',
  });

  // State for AI generation
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  /**
   * Generic handler for updating NuBank receipt data.
   * @param field The key of the field to update.
   * @param value The new value for the field.
   */
  const handleNuBankDataChange = <T extends keyof NuBankReceiptData>(
    field: T,
    value: NuBankReceiptData[T],
  ) => {
    setNuBankData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Generic handler for updating PicPay receipt data.
   * @param field The key of the field to update.
   * @param value The new value for the field.
   */
  const handlePicPayDataChange = <T extends keyof PicPayReceiptData>(
    field: T,
    value: PicPayReceiptData[T],
  ) => {
    setPicPayData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handles AI generation based on the user's prompt and current receipt type.
   */
  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    setAiError(null);

    if (!process.env.API_KEY) {
      setAiError("API Key is not configured. Please ensure process.env.API_KEY is set.");
      setIsGenerating(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = "gemini-3-pro-preview"; // Using gemini-3-pro-preview for complex text tasks

      let schema: NuBankReceiptSchema | PicPayReceiptSchema;
      let promptText: string;
      let updateData: (data: any) => void;
      let currentData: NuBankReceiptData | PicPayReceiptData;

      if (currentReceiptType === ReceiptType.NUBANK) {
        schema = {
          type: Type.OBJECT,
          properties: {
            dateTime: { type: Type.STRING, description: 'Data e hora da transação no formato YYYY-MM-DDTHH:MM' },
            value: { type: Type.STRING, description: 'Valor da transação em centavos, apenas números (ex: 2300 para R$23,00)' },
            transferType: { type: Type.STRING, description: 'Tipo de transferência (ex: Pix, TED)' },
            recipientName: { type: Type.STRING, description: 'Nome completo do destinatário' },
            recipientCpf: { type: Type.STRING, description: 'CPF do destinatário, apenas números' },
            recipientInstitution: { type: Type.STRING, description: 'Instituição financeira do destinatário' },
            recipientAgency: { type: Type.STRING, description: 'Número da agência do destinatário' },
            recipientAccount: { type: Type.STRING, description: 'Número da conta do destinatário' },
            recipientPixKey: { type: Type.STRING, description: 'Chave Pix do destinatário (e-mail, telefone, CPF, CNPJ, aleatória)' },
            senderName: { type: Type.STRING, description: 'Nome completo do remetente' },
            senderCnpj: { type: Type.STRING, description: 'CNPJ do remetente, apenas números' },
            senderInstitution: { type: Type.STRING, description: 'Instituição financeira do remetente' },
            senderAgency: { type: Type.STRING, description: 'Número da agência do remetente' },
            senderAccount: { type: Type.STRING, description: 'Número da conta do remetente' },
            transactionId: { type: Type.STRING, description: 'ID ou identificador da transação' },
          },
          required: [], // AI can infer most, will handle missing fields
        };
        promptText = `Gere um comprovante de transferência Pix do NuBank com base na seguinte descrição: "${aiPrompt}". Forneça a saída como um objeto JSON estritamente conforme o schema. Para 'value', forneça o valor em centavos (ex: 2300 para R$23,00). Para 'cpf' e 'cnpj', forneça apenas dígitos. Para 'dateTime', use o formato 'YYYY-MM-DDTHH:MM'.`;
        updateData = (data) => setNuBankData((prev) => ({ ...prev, ...data }));
        currentData = nuBankData;
      } else { // PicPay
        schema = {
          type: Type.OBJECT,
          properties: {
            dateTime: { type: Type.STRING, description: 'Data e hora do pagamento no formato YYYY-MM-DDTHH:MM' },
            statusMessage: { type: Type.STRING, description: 'Mensagem de status do pagamento (ex: Seu pagamento foi enviado com sucesso!)' },
            value: { type: Type.STRING, description: 'Valor do pagamento em centavos, apenas números (ex: 53839 para R$538,39)' },
            payeeName: { type: Type.STRING, description: 'Nome do beneficiário' },
            payeeCnpj: { type: Type.STRING, description: 'CNPJ do beneficiário, apenas números' },
            payerName: { type: Type.STRING, description: 'Nome do pagador' },
            payerCpf: { type: Type.STRING, description: 'CPF do pagador, apenas números' },
            liquidatingBank: { type: Type.STRING, description: 'Banco liquidante' },
            authenticationCode: { type: Type.STRING, description: 'Código de autenticação do pagamento' },
            dueDate: { type: Type.STRING, description: 'Data de vencimento no formato DD/MM/AAAA' },
            invoiceValue: { type: Type.STRING, description: 'Valor do boleto em centavos, apenas números' },
            totalInvoiceValue: { type: Type.STRING, description: 'Valor total do boleto em centavos, apenas números' },
            transactionId: { type: Type.STRING, description: 'ID da transação' },
            barcode: { type: Type.STRING, description: 'Código de barras do boleto' },
          },
          required: [],
        };
        promptText = `Gere um comprovante de pagamento Pix do PicPay com base na seguinte descrição: "${aiPrompt}". Forneça a saída como um objeto JSON estritamente conforme o schema. Para 'value', 'invoiceValue' e 'totalInvoiceValue', forneça o valor em centavos (ex: 53839 para R$538,39). Para 'cpf' e 'cnpj', forneça apenas dígitos. Para 'dateTime', use o formato 'YYYY-MM-DDTHH:MM'. Para 'dueDate', use o formato 'DD/MM/AAAA'.`;
        updateData = (data) => setPicPayData((prev) => ({ ...prev, ...data }));
        currentData = picPayData;
      }

      const response = await ai.models.generateContent({
        model: model,
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.7, // Adjust temperature for creativity vs. adherence
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("AI did not return any text.");
      }

      const generatedData = JSON.parse(text);

      // Merge generated data with existing data, handling date-time for default
      const updatedFields: any = {};
      for (const key in generatedData) {
        if (Object.prototype.hasOwnProperty.call(generatedData, key)) {
          updatedFields[key] = generatedData[key];
        }
      }
      
      // Ensure date-time is valid for input type
      if (updatedFields.dateTime && !isNaN(new Date(updatedFields.dateTime).getTime())) {
        const d = new Date(updatedFields.dateTime);
        updatedFields.dateTime = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      } else {
        updatedFields.dateTime = currentData.dateTime; // Keep current if AI generates invalid
      }
      
      // Handle PicPay dueDate format if AI provides different
      if (currentReceiptType === ReceiptType.PICPAY && updatedFields.dueDate) {
        const dateParts = updatedFields.dueDate.split('/');
        if (dateParts.length === 3) {
          updatedFields.dueDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
        }
      }

      updateData(updatedFields);

    } catch (error: any) {
      console.error("AI Generation Error:", error);
      setAiError(error.message || "Falha ao gerar comprovante com IA. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4">
      {/* Controls and Form Section (Left side on larger screens, top on small screens) */}
      <div className="lg:w-1/2 p-6 bg-white shadow-lg rounded-lg lg:mr-4 mb-4 lg:mb-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerador de Comprovante Pix</h1>

        {/* Receipt Type Selection Buttons - Sticky for accessibility */}
        <div className="flex space-x-4 mb-6 sticky top-0 bg-white pt-2 pb-4 z-10 border-b border-gray-200">
          <button
            onClick={() => setCurrentReceiptType(ReceiptType.NUBANK)}
            className={`px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
              currentReceiptType === ReceiptType.NUBANK
                ? 'bg-nubankPurple text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            NuBank
          </button>
          <button
            onClick={() => setCurrentReceiptType(ReceiptType.PICPAY)}
            className={`px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
              currentReceiptType === ReceiptType.PICPAY
                ? 'bg-picpayGreen text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            PicPay
          </button>
        </div>

        {/* AI Generation Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Gerar Comprovante com IA</h2>
          <div className="mb-4">
            <label htmlFor="aiPrompt" className="block text-gray-700 text-sm font-bold mb-2">
              Descreva o comprovante que você deseja gerar:
            </label>
            <textarea
              id="aiPrompt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nubankPurple focus:border-transparent h-24 resize-y"
              placeholder={`Ex: "Pagamento de conta de luz para João da Silva, CPF 123.456.789-00, no valor de 120 reais, via Pix no dia ${new Date().toLocaleDateString('pt-BR')}."`}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isGenerating}
              aria-label="Prompt para geração de comprovante com IA"
            ></textarea>
          </div>
          <button
            onClick={handleGenerateWithAI}
            className={`w-full py-2 px-4 rounded-md text-lg font-medium transition-colors duration-200 ${
              isGenerating
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
            }`}
            disabled={isGenerating}
            aria-live="polite"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando comprovante...
              </span>
            ) : (
              'Gerar com IA'
            )}
          </button>
          {aiError && (
            <p className="text-red-600 text-sm mt-3" role="alert">
              Erro: {aiError}
            </p>
          )}
        </div>

        {/* Dynamic Form Area */}
        <div className="mt-8">
          {currentReceiptType === ReceiptType.NUBANK ? (
            <NuBankForm data={nuBankData} onDataChange={handleNuBankDataChange} />
          ) : (
            <PicPayForm data={picPayData} onDataChange={handlePicPayDataChange} />
          )}
        </div>
      </div>

      {/* Receipt Preview Section (Right side on larger screens, bottom on small screens) */}
      <div className="lg:w-1/2 flex items-start justify-center p-4 bg-gray-50 rounded-lg shadow-lg overflow-auto">
        {currentReceiptType === ReceiptType.NUBANK ? (
          <NuBankReceipt data={nuBankData} />
        ) : (
          <PicPayReceipt data={picPayData} />
        )}
      </div>
    </div>
  );
};

export default App;
