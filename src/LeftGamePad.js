import './LeftGamePad.css';

export default function LeftGamePad() {
    return (
        <div className="controller">
            <div className="front">
                <div className="decoration">
                    <div className="stickers">
                        <div className="st-a">A</div>
                        <div className="st-b">B</div>
                        <div className="st-select">SELECT</div>
                        <div className="st-start">START</div>
                    </div>
                </div>
                <div className="cross">
                    <div className="circle"></div>
                    <div className="horizontal">
                        <div className="arrowlf"></div>
                        <div className="arrowrh"></div>
                    </div>
                    <div className="vertical">
                        <div className="arrowlf"></div>
                        <div className="arrowrh"></div>
                    </div>
                    <div className="back-cross">
                        <div className="horiz"></div>
                        <div className="vert"></div>
                    </div>
                </div>
                <div className="buttons-a-b">
                    <div className="btn-border">
                        <div className="btn-round a"></div>
                    </div>
                    <div className="btn-border">
                        <div className="btn-round b"></div>
                    </div>
                </div>
                <div className="buttons-select">
                    <div className="btn-central select"></div>
                    <div className="btn-central start"></div>
                </div>
            </div>
        </div>
    );
}