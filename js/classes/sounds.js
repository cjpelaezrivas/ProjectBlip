class Sound {
    constructor ( name, file, repeatIn, offset = 0 ){
        this.name = name;
        this.file = file;
        this.repeatIn = repeatIn;
        this.offset = offset;
    }
};

export const sounds = [
    new Sound("Airplane", "./sounds/airplane.mp3", 1200),
    new Sound("Bell", "./sounds/bell.mp3", 1250),
    new Sound("Casio", "./sounds/casio.mp3", 900),
    new Sound("Cuckoo", "./sounds/cuckoo.mp3", 1000),
    new Sound("Ding", "./sounds/ding.mp3", 750),
    new Sound("Ding ding ", "./sounds/ding-ding.mp3", 1100),
    new Sound("Sleigh bell", "./sounds/sleigh-bell.mp3", 500),
    new Sound("Soft gong", "./sounds/soft-gong.mp3", 1250),
    new Sound("Sonar", "./sounds/sonar.mp3", 1000),
    new Sound("Toy train", "./sounds/toy-train.mp3", 1200)
];
