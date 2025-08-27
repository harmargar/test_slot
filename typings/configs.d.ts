type Point = import("pixi.js").Point;
type ITextStyle = import("pixi.js").ITextStyle
type TextStyle = import("pixi.js").TextStyle


type ButtonStateKey = 'up' | 'down' | 'disable';

type SpriteConfig = {
    texture: string;
    x?: number;
    y?: number;
    tint?: number;
    scale?: Point;
    anchor?: Point;
};

type TextureConfig = string;

type TextConfig = {
    x?: number;
    y?: number;
    text: string;
    anchor?: Point;
    style?: Partial<ITextStyle> | TextStyle;
};

type AnimationConfig = {
    frames: string[];
    speed?: number;
    loop?: boolean;
    x?: number;
    y?: number;
    scale?: Point;
    anchor?: Point;
};
