class Sound {
    constructor ( name, file, offset = 0 ){
        this.name = name;
        this.file = file;
        this.offset = offset;
    }
};

export const sounds = [
    new Sound("Airplane", "./sounds/airplane.mp3"),
    new Sound("Bell", "./sounds/bell.mp3"),
    new Sound("Casio", "./sounds/casio.mp3"),
    new Sound("Cuckoo", "./sounds/cuckoo.mp3"),
    new Sound("Ding", "./sounds/ding.mp3"),
    new Sound("Ding ding ", "./sounds/ding-ding.mp3"),
    new Sound("Sleigh bell", "./sounds/sleigh-bell.mp3"),
    new Sound("Soft gong", "./sounds/soft-gong.mp3"),
    new Sound("Sonar", "./sounds/sonar.mp3"),
    new Sound("Toy train", "./sounds/toy-train.mp3")
];
