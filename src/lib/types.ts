export interface OverlayPage {
	path: string;
	data: OverlayPageData[];
}

export interface OverlayPageData {
	key: string;
	value: string;
}

export interface ButtonDef {
	display_text: string;
	page: OverlayPage;
}

export interface Player {
	name: string;
	score: string;
	id: string;
	streamUrl: string;
}

export interface Team {
	name: string;
	id: string;
	players: Player[];
}
