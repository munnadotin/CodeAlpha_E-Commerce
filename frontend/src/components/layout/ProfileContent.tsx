import { useState } from "react";
import type { Address, User } from "../../types/auth.type"
import AddressModel from "./AddressModel";
import { SquarePen, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { deleteAddressThunk } from "../../api/authThunk";

interface ProfileContentProps {
    user: User
}

function ProfileContent({ user }: ProfileContentProps) {
    if (!user) return null;
    const dispatch = useDispatch<AppDispatch>();
    const [activeModel, setActiveModel] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.address.map((address, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-300 rounded-xl p-4 bg-white"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {address.street}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {address.city}, {address.state} - {address.zipCode}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    {address.country}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 ml-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedAddress(address);
                                                        setActiveModel(true);
                                                    }}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition cursor-pointer"
                                                >
                                                    <SquarePen strokeWidth={1.5} className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => dispatch(deleteAddressThunk(address._id))}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition cursor-pointer"
                                                >
                                                    <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                                                </button>
                                            </div>
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
                {activeModel && (<AddressModel
                    address={selectedAddress}
                    onClose={() => {
                        setActiveModel(false);
                    }}
                />)}
            </div>
        </div>
    )
}

export default ProfileContent