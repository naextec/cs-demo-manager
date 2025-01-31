import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  resizable?: boolean;
};

export const TextArea = React.forwardRef(function TextArea(
  { resizable = true, ...props }: Props,
  ref: React.Ref<HTMLTextAreaElement>,
) {
  return (
    <textarea
      ref={ref}
      className={`appearance-none outline-none rounded duration-85 transition-all bg-gray-50 w-full p-8 text-gray-800 border border-gray-400 focus:border-gray-900 placeholder:text-gray-500 disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500 hover:enabled:focus:border-gray-900 hover:enabled:border-gray-600 h-full ${
        resizable ? 'resize-y' : 'resize-none'
      }`}
      {...props}
    />
  );
});
