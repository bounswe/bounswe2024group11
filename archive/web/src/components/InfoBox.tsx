import { RiContactsBook2Line } from "@remixicon/react";
import React from "react";

export type InfoBoxProps = {
	label: string;
	description: string;
	place: string;
	siteLinks: string;
	type: string;
};

const InfoBox = ({
	label,
	description,
	place,
	siteLinks,
	type,
}: InfoBoxProps) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-card rounded-2 border border-slate-100 bg-white p-4 flex flex-col gap-4 cursor-pointer hover:bg-slate-50 transition-all duration-200 hover:shadow-none hover:border-slate-200">
			<div className="flex flex-col gap-2 flex-1">
				<RiContactsBook2Line className="text-cyan-700 text-4xl" />
				<div className="flex flex-col gap-1">
					<p className="text-cyan-800 font-medium tracking-wider text-xs">
						{place.toUpperCase()}
					</p>
					<h1 className="font-medium text-lg">{label}</h1>
					<p className="text-gray-500 capitalize text-sm">{description}</p>
				</div>
			</div>
			<p className="text-gray-900 text-center text-xs  px-2 py-1 bg-slate-100 rounded-1">
				{siteLinks} links
			</p>
		</div>
	);
};

export default InfoBox;
