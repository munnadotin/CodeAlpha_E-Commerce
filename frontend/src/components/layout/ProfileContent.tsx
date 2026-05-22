import { useState } from "react";
import type { User } from "../../types/auth.type"
import AddressModel from "./AddressModel";
import { SquarePen, Trash2 } from "lucide-react";

interface ProfileContentProps {
    user: User
}

function ProfileContent({ user }: ProfileContentProps) {
    if (!user) return null;
    const [activeModel, setActiveModel] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="cursor-not-allowed">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <p className="text-gray-900 bg-gray-50 px-4 py-2.5 rounded-lg">{user.name}</p>
                    </div>
                    <div className="cursor-not-allowed">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <p className="text-gray-900 bg-gray-50 px-4 py-2.5 rounded-lg">{user.email}</p>
                    </div>
                    <div className="cursor-not-allowed">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                        <p className="text-gray-900 bg-gray-50 px-4 py-2.5 rounded-lg">{user.role}</p>
                    </div>
                </div>

                {user.role === "user" && (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Address
                        </label>

                        {user.address && user.address.length > 0 ? (
                            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.address.map((address, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl flex items-start justify-between border border-gray-200 bg-white p-4 transition"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm font-medium text-gray-900">
                                                {address.street}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600">
                                                {address.city}, {address.state} - {address.zipCode}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {address.country}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer">
                                                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer">
                                                <SquarePen strokeWidth={1.5} className="w-4 h-4" />
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10">
                                <p className="text-sm text-gray-500">
                                    No delivery address added yet
                                </p>

                                <button
                                    onClick={() => setActiveModel(true)}
                                    type="button"
                                    className="mt-4 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                                >
                                    Add Address
                                </button>
                            </div>
                        )}
                    </div>
                )
                }

                {/* popup model */}
                {activeModel && (<AddressModel setActiveModel={setActiveModel} />)}
            </div>
        </div>
    )
}

export default ProfileContent