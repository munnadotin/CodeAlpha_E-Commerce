import { Handbag, LogOut, User2 } from "lucide-react";
import type { User } from "../../types/auth.type";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

type ActiveTabType = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    user: User
}

const ProfileCard = ({ activeTab, setActiveTab, user }: ActiveTabType) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        dispatch(clearUser())
        navigate('/login');
    };
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">

                {/* User Info */}
                <div className="p-6 text-center border-b border-gray-100">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-light text-white">
                            {user.name.charAt(0)}
                        </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                    {/* <p className="text-xs text-gray-400 mt-2">Member since {user.joinDate}</p> */}
                </div>

                {/* Navigation */}
                <div className="p-4 space-y-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === 'profile' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                    >
                        <User2 strokeWidth={1.5} className="h-5 w-5" />
                        <span className="text-sm font-medium">Profile</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === 'orders' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                    >
                        <Handbag strokeWidth={1.5} className="h-5 w-5" />
                        <span className="text-sm font-medium">My Orders</span>
                    </button>

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        >
                            <LogOut strokeWidth={1.5} className="h-5 w-5" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard