import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SomePage from "../../back/back";
import { VehicleApi } from "../users/UsersAPI";

function VehicleDetails() {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState({
        manufacturer: "",
        model: "",
        vehicleYear: "",
        rental_rate: 0,
        seatingCapacity: 0,
        color: "",
        transmission: "",
        engineCapacity: "",
        fuelType: "",
        features: "",
        imageLink: "",
    });

    const [specData, setSpecData] = useState({
        specifications: {
            manufacturer: "",
            model: "",
            vehicleYear: "",
            features: "",
            seatingCapacity: 0,
            color: "",
            transmission: "",
            engineCapacity: "",
            fuelType: "",
            imageLink: "",
        },
    });

    const [createVehicle] = VehicleApi.useCreateVehicleMutation();
    const [createVehicleSpec] = VehicleApi.useCreateVehicleSpecificationMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVehicleData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSpecData(prev => ({
            specifications: { ...prev.specifications, [name]: value },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const vehicleResponse = await createVehicle(vehicleData).unwrap();
            await createVehicleSpec({ ...specData, vehicleId: vehicleResponse.id });
            alert("Vehicle created successfully!");
            navigate("/vehicles"); // Redirect to the vehicle list or details page
        } catch (error) {
            console.error("Failed to create vehicle:", error);
            alert("Failed to create vehicle. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <SomePage/>
            <h1 className="text-2xl font-bold mb-4">Create New Vehicle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Vehicle Details</h2>
                <input type="text" name="manufacturer" placeholder="Manufacturer" onChange={handleChange} required className="input" />
                <input type="text" name="model" placeholder="Model" onChange={handleChange} required className="input" />
                <input type="number" name="vehicleYear" placeholder="Vehicle Year" onChange={handleChange} required className="input" />
                <input type="number" name="rental_rate" placeholder="Rental Rate" onChange={handleChange} required className="input" />
                <input type="number" name="seatingCapacity" placeholder="Seating Capacity" onChange={handleChange} required className="input" />
                <input type="text" name="color" placeholder="Color" onChange={handleChange} required className="input" />
                <input type="text" name="transmission" placeholder="Transmission" onChange={handleChange} required className="input" />
                <input type="text" name="engineCapacity" placeholder="Engine Capacity" onChange={handleChange} required className="input" />
                <input type="text" name="fuelType" placeholder="Fuel Type" onChange={handleChange} required className="input" />
                <textarea name="features" placeholder="Features" onChange={handleChange} required className="input" />
                <input type="text" name="imageLink" placeholder="Image Link" onChange={handleChange} required className="input" />

                <h2 className="text-xl font-semibold">Vehicle Specifications</h2>
                <input type="text" name="manufacturer" placeholder="Spec Manufacturer" onChange={handleSpecChange} required className="input" />
                <input type="text" name="model" placeholder="Spec Model" onChange={handleSpecChange} required className="input" />
                <input type="number" name="vehicleYear" placeholder="Spec Vehicle Year" onChange={handleSpecChange} required className="input" />
                <textarea name="features" placeholder="Spec Features" onChange={handleSpecChange} required className="input" />
                <input type="number" name="seatingCapacity" placeholder="Spec Seating Capacity" onChange={handleSpecChange} required className="input" />
                <input type="text" name="color" placeholder="Spec Color" onChange={handleSpecChange} required className="input" />
                <input type="text" name="transmission" placeholder="Spec Transmission" onChange={handleSpecChange} required className="input" />
                <input type="text" name="engineCapacity" placeholder="Spec Engine Capacity" onChange={handleSpecChange} required className="input" />
                <input type="text" name="fuelType" placeholder="Spec Fuel Type" onChange={handleSpecChange} required className="input" />
                <input type="text" name="imageLink" placeholder="Spec Image Link" onChange={handleSpecChange} required className="input" />

                <button type="submit" className="btn btn-primary mt-4">Create Vehicle</button>
            </form>
        </div>
    );
}

export default VehicleDetails;
