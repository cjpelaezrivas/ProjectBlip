class TimeInterval {
    constructor ( delta, label ){
      this.delta = delta;
      this.label = label;
    }
};

export const timeIntervals = [
    new TimeInterval(1, "1 min"),
    new TimeInterval(2, "2 min"),
    new TimeInterval(5, "5 min"),
    new TimeInterval(10, "10 min"),
    new TimeInterval(15, "15 min"),
    new TimeInterval(20, "20 min"),
    new TimeInterval(30, "30 min"),
    new TimeInterval(60, "1 hour"),
];
