export default interface CarModel {
    id: string;
    name: string;
    image: string;
    specs?: {
        topSpeed?: number;
        acceleration?: number;
        power?: number;
        motorSize?: number;
        wheelDrive?: string;
        dailyPrice?: number;
    };
}
