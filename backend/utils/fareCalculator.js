export const calculateFare = (baseFare, distance, perKmRate, estimatedTime, perMinuteRate) => {
    return Math.round(baseFare + distance * perKmRate + estimatedTime * perMinuteRate);
};