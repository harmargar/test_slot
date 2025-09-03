import gsap from 'gsap';
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { makeSprite } from '../utils';

export class BigWinView extends Container {
    private _valueContiner: Container;
    private _baner: Sprite;
    private _glow: Sprite;
    private _arrow: Sprite;
    private _context: Container;
    private _boundsGrap: Graphics;

    public constructor() {
        super();
        this.name = 'BigWinView';
        this._init();

    }

    public getBounds(): Rectangle {
        return !!this._boundsGrap ? this._boundsGrap.getBounds() : super.getBounds();
    }

    public show(winValue: number): void {
        this._glow.scale.set(3.3);
        this._arrow.position.set(0, 0);
        this._baner.scale.set(1);
        this._arrow.position.set(0);

        this._arrow.visible = true;
        this._baner.visible = true;
        this._glow.visible = true;
        gsap.to(this, { alpha: 1, duration: 0.3, ease: 'sine.out' });
        gsap.from(this._arrow, { y: -1000, duration: 1, ease: 'bounce.out' });
        gsap.from(this._baner.scale, { x: 0, y: 0, duration: 1, ease: 'bounce.out' });
        gsap.from(this._glow.scale, { x: 0, y: 0, duration: 1, ease: 'bounce.out' });
        gsap.to(this._glow, { rotation: Math.PI * 2, duration: 10, repeat: -1, ease: 'none' });
        this._animateText(winValue);
    }

    public hide(force: boolean = false): void {
        if (!force)
            gsap.to(this, { alpha: 0, duration: 0.5, ease: 'sine.out' }).eventCallback('onComplete', () => {
                this._hideAcionCompite();
            });
        else {
            this.alpha = 0;
            this._hideAcionCompite();
        }
    }

    private _hideAcionCompite(): void {
        this._arrow.visible = false;
        this._baner.visible = false;
        this._glow.visible = false;
        gsap.killTweensOf(this);
        gsap.killTweensOf(this._arrow);

        gsap.killTweensOf(this._baner.scale);
        gsap.killTweensOf(this._glow.scale);
        gsap.killTweensOf(this._glow);
    }

    private _init(): void {
        this._context = new Container();

        const glow = makeSprite('win_glow.png');
        this._context.addChild(this._glow = glow);
        glow.visible = false;
        glow.scale.set(3.3);

        const banner = makeSprite('win_banner.png');
        banner.y = 210;
        banner.visible = false;
        this._context.addChild(this._baner = banner);

        const arrow = makeSprite("win_arrow.png");
        arrow.visible = false;
        this._context.addChild(this._arrow = arrow)

        this._makeText(10);

        this._boundsGrap = new Graphics();
        this._boundsGrap.beginFill(0xff0000, 0.01);
        this._boundsGrap.drawRect(-350, -160, 700, 500);
        this._boundsGrap.endFill()

        this.addChild(this._boundsGrap);

        this.addChild(this._context);
    }

    private _makeText(value: number): void {
        const numbersNames = `${value}`.split('');
        const valueContiner = new Container();

        for (let i = numbersNames.length - 1; i >= 0; i--) {
            const spr = makeSprite(`${numbersNames[i]}.png`);
            spr.anchor.set(0, 0);
            spr.x = 90 * i;
            valueContiner.addChild(spr);
        }

        this._baner.addChild(this._valueContiner = valueContiner);
        this._valueContiner.pivot.set(this._valueContiner.width / 2, this._valueContiner.height / 2);
        this._valueContiner.y = 20;
        this._valueContiner.x = 10;
        // this._valueContiner.visible = false;
        this._valueContiner.scale.set(Math.min((this._baner.width - 200) / this._valueContiner.width, this._valueContiner.scale.x));
    }


    private _animateText(nextValue: number): void {
        const obg = { value: 0 };
        gsap.to(obg, { value: nextValue, duration: 2, ease: 'sine.in' }).eventCallback('onUpdate', (...args: unknown[]) => {
            this._valueContiner.destroy();
            this._makeText(Math.floor(obg.value))
        })
    }

}
