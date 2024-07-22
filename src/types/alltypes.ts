
export interface TUser{
    id:number;
    fullname: string,
    link:string;
    email: string,
    role: string,
    password: string,
    contact_phone: string,
    address: string
}
export interface TSearch{
    id:number;
    fullname:string,
    password:string,
    address:string,
    contact_phone:string,
    email:string
}

export interface Update{
    address:string,
    contact_phone: string,
    password: string,
    fullname: string,
    role: string,
}

export interface TVehicle{
    id: number;
    userId: number;
    image: string;
    rental_rate: string;
    availability: string;
    vehicleId: number;
}

export interface TVehicleSpec {
    id: number;
    vehicleId:number;
    manufacturer: string;
    imageLink: string;
    model: string;
    color: string;
    fuelType: string;
    seatingCapacity: number;
    features: string;
    engineCapacity: number;
    transmission: string;
    vehicleYear: number;
}
export interface User {
    email: string;
    role: string;
    token: string;
}

export interface LoginRequest {
    token: string;
    email:string;
    role: string;
    user: {
        token: string;
        email: string;
        role: string;
    };
}
export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}


export interface LoginFormValues {
    email: string;
    password: string;
}

export interface PaymentForm{
    id: number;
    bookingId:number;
    Amount: string;
    paymentStatus: string;
    paymentMethod:string;
    transactionId:string;

}

export interface TAvailabilityVehicle{
    id: number;
    link: string;
    name: string;
    year:string;
    model: string;
    price:string;
    mileage:string;
    color: string;
    transmission: string;
    engine: string;
}
export interface RegisterVehicleFormValues {
    link: string;
    name: string;
    price: string;
    model: string;
    year:string;
    mileage: string;
    color: string;
    transmission: string;
    engine: string;
  }

  export type Users = {
    id: number;
    fullname: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
    token: string;
    link: string;
  };

  export type BookingState = {
    id: string
  }
  export interface TypeUser {
    id: number;
    fullname: string;
    link: string;
    email: string;
    password: string;
    contact_phone: number;
    role: string;
    address: string;
}

export interface UserState {
    token: string | null;
    user: TypeUser | null;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: TypeUser | null;
    token: string | null;
}

