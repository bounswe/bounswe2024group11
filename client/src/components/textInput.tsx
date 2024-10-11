import React, { forwardRef } from "react";
import * as Label from "@radix-ui/react-label";
import { Primitive } from "@radix-ui/react-primitive";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: boolean;
    "aria-errormessage"?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            label,
            name,
            type = "text",
            placeholder,
            required,
            error,
            "aria-label": ariaLabel,
            "aria-errormessage": ariaErrorMessage,
            className = "",
            ...props
        },
        ref,
    ) => {
        const id = `input-${name}`;

        return (
            <div className="flex flex-col gap-2">
                <Label.Root htmlFor={id} className="text-sm font-medium">
                    {label}
                </Label.Root>
                <Primitive.input
                    ref={ref}
                    type={type}
                    id={id}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    aria-invalid={!!error}
                    aria-errormessage={error ? ariaErrorMessage : undefined}
                    className={`px-3 py-2 rounded-md border ${
                        error
                            ? "border-red-500 text-red-800"
                            : "border-gray-300"
                    } ${className}`}
                    {...props}
                />
                {error && ariaErrorMessage && (
                    <p className="text-sm text-red-500" id={`${id}-error`}>
                        {ariaErrorMessage}
                    </p>
                )}
            </div>
        );
    },
);

export default TextInput;
