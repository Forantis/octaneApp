export default interface CarModel {
    id: string;
    name: string;
    image: string;
    specs?: {
        dailyPrice?: number;
    };
}
