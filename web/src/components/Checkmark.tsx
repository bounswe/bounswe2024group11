type IconProps = { indeterminate: boolean | undefined; className: string };

export const Checkmark = ({ indeterminate, className }: IconProps) => {
	return (
		<svg
			className={className}
			width="10"
			height="8"
			viewBox="0 0 10 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ transform: indeterminate ? "rotate(45deg)" : "" }}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.53039 2.03039L4.00006 7.56072L0.469727 4.03039L1.53039 2.96973L4.00006 5.4394L8.46973 0.969727L9.53039 2.03039Z"
				fill="white"
			/>
		</svg>
	);
};
