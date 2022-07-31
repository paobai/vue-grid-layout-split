export declare enum GridItemType {
    SMALL = 0,
    BIG = 1
}
export declare enum GridPosition {
    LEFT = 0,
    RIGHT = 1
}
export interface LayoutType {
    id: number;
    x: number;
    y: number;
    h: number;
    height: number;
    resetH: number;
    type: GridItemType;
    [key: string]: any;
}
export declare function fixCardHeight(layout: LayoutType[]): void;
