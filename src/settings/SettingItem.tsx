import React from "react";

interface ItemInfo {
	name?: string;
	description?: string | React.ReactNode;
}

export function SettingItemInfo({ name, description }: ItemInfo) {
	return (
		<div className="setting-item-info">
			<div className="setting-item-name">{name}</div>
			<div className="setting-item-description">{description}</div>
		</div>
	);
}

export function SettingItem({
	name,
	description,
	children,
}: React.PropsWithChildren<ItemInfo>) {
	return (
		<div className="setting-item">
			<SettingItemInfo name={name} description={description} />
			<div className="setting-item-control">{children}</div>
		</div>
	);
}
