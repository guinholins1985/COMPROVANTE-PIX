
import React from 'react';

/**
 * Props for the Input component.
 * Extends standard HTML input attributes for flexibility.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // The label text displayed above the input.
  id: string;    // Unique identifier for the input, used for label association.
  type?: string; // HTML input type (default 'text').
}

/**
 * A reusable input field component with a label and Tailwind CSS styling.
 * It provides a consistent look and feel for form inputs.
 */
const Input: React.FC<InputProps> = ({ label, id, type = 'text', ...rest }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        // Tailwind classes for styling: shadow, border, rounded corners, padding,
        // text color, leading tight, and focus styles with a NuBank purple ring.
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-nubankPurple focus:border-transparent"
        {...rest}
      />
    </div>
  );
};

export default Input;
