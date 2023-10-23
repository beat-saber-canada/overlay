export interface OverlayPage {
    path: string;
    data: OverlayPageData[];
}

export interface OverlayPageData {
    key: String;
    value: String;
}

export interface ButtonDef {
    display_text: string;
    page: OverlayPage;
}