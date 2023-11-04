export interface OverlayPage {
	path: string;
	data: OverlayPageData[];
}

export interface OverlayPageData {
	key: string;
	value: string;
}

export interface User {
	id: string;
	name: string;
	userId: string;
	playState: string;
	downloadState: string;
	team: Team
	modList: string[];
	streamDelayMs: number;
	streamSyncStartMs: number;
}

export interface Team {
	name: string;
	id: string;
	avgScore: number | undefined;
	avgAccuracy: number | undefined;
}

export interface Score {
	ownerId: string;
	score: number;
	scoreWithModifiers: number;
	maxScore: number;
	maxScoreWithModifiers: number;
	combo: number;
	playerHealth: number;
	accuracy: number;
	songPosition: number;
	notesMissed: number;
	badCuts: number;
	bombHits: number;
	wallHits: number;
	maxCombo: number;
	leftHandHits: number;
	leftHandMisses: number;
	leftHandBadCut: number;
	rightHandHits: number;
	rightHandMisses: number;
	rightHandBadCut: number;
}

export interface Song {
	id: string;
	name: string;
	difficulty: number;
	modifiers: string[];
}

export interface Match {
	id: string;
	players: User[];
	teams: Team[];
	coordinators: User[];
	currentMap: Song;
	scores: Score[];
}