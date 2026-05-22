import { useForm } from "react-hook-form"
import type { address } from "../../types/auth.type";

function AddressModel({ setActiveModel }: { setActiveModel: (active: boolean) => void }) {
    const { register, handleSubmit } = useForm();

    const onsubmit = (data: address) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onsubmit)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">Add New Address</h2>
                </div>

                {/* Form Fields */}
                <div className="p-6 space-y-4">
                    {/* Street */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400"
                            placeholder="Enter street address"
                            {...register("street", { required: true })}
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400"
                            placeholder="Enter city"
                            {...register("city", { required: true })}
                        />
                    </div>

                    {/* State & Zip Code Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400"
                                placeholder="State"
                                {...register("state", { required: true })}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Zip Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400"
                                placeholder="Zip code"
                                {...register("zipCode", { required: true })}
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400"
                            placeholder="Enter country"
                            {...register("country", { required: true })}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 pt-0 border-t border-gray-100 mt-2">
                    <button
                        type="submit"
                        className="flex-1 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
                    >
                        Save Address
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveModel(false)}
                        className="flex-1 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddressModel