class Configuration {
    constructor ( key, defaultValue ){
        this.key = key;
        this.defaultValue = defaultValue;
    }
};

export const VOLUME = new Configuration("volume", 25);
export const TIME_INTERVAL = new Configuration("time-interval", 4);
export const SOUND = new Configuration("sound", 2);
