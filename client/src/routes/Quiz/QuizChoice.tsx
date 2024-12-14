import { cva, type VariantProps } from "cva";

const choiceClass = cva(
    [
        "flex",
        "cursor-pointer",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-2",
        "px-4",
        "py-3",
        "text-center",
        "text-lg",
        "transition-colors",
        "duration-200",
    ],
    {
        variants: {
            showAnswer: {
                true: "cursor-default",
                false: "",
            },
            isCorrect: {
                true: "",
                false: "",
            },
            isSelected: {
                true: "",
                false: "",
            },
        },
        compoundVariants: [
            {
                showAnswer: true,
                isCorrect: true,
                isSelected: false,
                className: "bg-green-200 text-green-900 text-white",
            },
            {
                showAnswer: true,
                isCorrect: true,
                isSelected: true,
                className: "bg-green-700 text-white",
            },
            {
                showAnswer: true,
                isCorrect: false,
                isSelected: true,
                className: "bg-red-700 text-white",
            },
            {
                showAnswer: true,
                isCorrect: false,
                isSelected: false,
                className: "bg-slate-100 text-slate-950",
            },
            {
                showAnswer: false,
                isSelected: true,
                className: "bg-cyan-700 text-white",
            },
            {
                showAnswer: false,
                isSelected: false,
                className: "bg-slate-100 text-slate-950 hover:bg-slate-200",
            },
            {
                showAnswer: true,
                isSelected: false,
                isCorrect: true,
                className: "bg-green-700 text-white",
            },
        ],
        defaultVariants: {
            showAnswer: false,
            isCorrect: false,
            isSelected: false,
        },
    },
);

type ChoiceButtonVariants = VariantProps<typeof choiceClass>;

interface ChoiceLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    showAnswer: boolean;
    isCorrect: boolean;
    isSelected: boolean;
    quizType: number;
}

const ChoiceLabel = ({
    showAnswer,
    isCorrect,
    isSelected,
    quizType,
    children,
    ...props
}: ChoiceLabelProps) => {
    return (
        <label
            className={choiceClass({ showAnswer, isCorrect, isSelected })}
            aria-describedby="question"
            lang={quizType === 2 ? "tr" : "en"}
            {...props}
        >
            {children}
        </label>
    );
};

export { choiceClass as choiceButton, ChoiceLabel, type ChoiceButtonVariants };
