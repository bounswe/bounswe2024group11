import type { ComponentProps } from "react";

type WikiWidgetProps = ComponentProps<"aside"> & {
	semanticData: Record<string, string>;
};

export const WikiWidget = ({ semanticData, ...props }: WikiWidgetProps) => {
	return (
		<aside {...props}>
			<div className="flex flex-col items-stretch gap-4 px-4 py-4 border-slate-200 border rounded-2">
				<img
					src="https://i.ibb.co/c1fGmZZ/post-image.png"
					alt="info box"
					width={400}
					height={200}
					className="rounded-1"
				/>
				<h2 className="font-medium text-lg text-slate-700"> Wiki Widget</h2>
				<hr className="border-slate-200" />
				<div className="flex flex-col items-stretch gap-5">
					{Object.entries(semanticData).map(([key, value]) => (
						<div key={key} className="flex flex-col items-stretch gap-1">
							<h3 className="text-slate-400 text-xs tracking-widest font-medium">
								{key.toLocaleUpperCase()}
							</h3>
							<p className="text-slate-900 text-sm">{value}</p>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
};
