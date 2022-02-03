class Sound {
    constructor ( name, file, offset = 0 ){
        this.name = name;
        this.file = file;
        this.offset = offset;
    }
};

export const sounds = [
    new Sound("Airplane", "/sounds/airplane.mp3"),
    new Sound("Bell", "./sounds/bell.mp3"),
    new Sound("Bicycle bell", "../sounds/bicycle-bell.mp3"),
    new Sound("Cash", "../sounds/cash.mp3"),
    new Sound("Casio", "../sounds/casio.mp3"),
    new Sound("Countdown", "../sounds/countdown.mp3", 5),
    new Sound("Cuckoo", "../sounds/cuckoo.mp3"),
    new Sound("Ding", "../sounds/ding.mp3"),
    new Sound("Ding B", "../sounds/ding-b.mp3"),
    new Sound("Ding C", "../sounds/ding-c.mp3"),
    new Sound("Ding ding ", "../sounds/ding-ding.mp3"),
    new Sound("Ding ding B", "../sounds/ding-ding-b.mp3"),
    new Sound("Low battery", "../sounds/low-battery.mp3"),
    new Sound("Relaxing bell", "../sounds/relaxing-bell.mp3"),
    new Sound("Ride cybal struck", "../sounds/ride-cymbal-struck.mp3"),
    new Sound("Right answer", "../sounds/right-answer.mp3"),
    new Sound("Sleigh bell", "../sounds/sleigh-bell.mp3"),
    new Sound("Soft gong", "../sounds/soft-gong.mp3"),
    new Sound("Sonar", "../sounds/sonar.mp3"),
    new Sound("Squaky toy", "../sounds/squeaky-toy.mp3"),
    new Sound("Timapni hit", "../sounds/timpani-hit.mp3"),
    new Sound("Toy train", "../sounds/toy-train.mp3"),
    new Sound("Winning bell", "../sounds/winning-bell.mp3"),
    new Sound("Winning bell B", "../sounds/winning-bell-b.mp3"),
    new Sound("Xbox turn off", "../sounds/xbox-turn-off.mp3")
];
