import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard"
import ProfileContent from "./ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import OrderContent from "./OrderContent";
import Ordres from "../../pages/admin/Ordres";
import ProductPage from "../../pages/admin/Product";
import { productThunk } from "../../api/productThunk";
import { categoryThunk } from "../../api/categoryThunk";

const ProfileLayout = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(productThunk());
        dispatch(categoryThunk());
    }, [dispatch]);

    return (
        <div className="min-h-[calc(100vh-200px)] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-light tracking-wide text-gray-900">
                        My<span className="font-semibold"> Account</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your profile, orders, and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <ProfileCard
                                user={user}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && <ProfileContent user={user} />}
                        {activeTab === 'my orders' && <OrderContent />}
                        {activeTab === 'orders' && <Ordres />}
                        {activeTab === 'products' && <ProductPage />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout