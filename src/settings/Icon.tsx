import React from "react";
import { setIcon } from "obsidian";

interface IconProps {
	name: string;
	className?: string;
}

export function Icon({ name, className }: IconProps) {
	return (
		<span
			data-icon={name}
			className={className}
			ref={(c) => {
				if (c) {
					setIcon(c, name);
				}
			}}
		/>
	);
}
