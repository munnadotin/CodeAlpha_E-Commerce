import { Cuboid, Handbag, LogOut, Package2, User2 } from "lucide-react";
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

    const profileAction = [
        {
            id: 1,
            name: 'Profile',
            role: ['user', 'admin'],
            icon: <User2 strokeWidth={1.5} className="w-5 h-5" />,
            onClick: () => setActiveTab('profile')
        },
        {
            id: 2,
            name: 'My Orders',
            role: ['user'],
            icon: <Handbag strokeWidth={1.5} className="w-5 h-5" />,
            onClick: () => setActiveTab('orders')
        },
        {
            id: 3,
            name: 'Products',
            role: ['admin'],
            icon: <Cuboid strokeWidth={1.5} className="w-5 h-5" />,
            onClick: () => setActiveTab('admin')
        },
        {
            id: 4,
            name: 'Orders',
            role: ['admin'],
            icon: <Package2 strokeWidth={1.5} className="w-5 h-5" />,
            onClick: () => setActiveTab('orders')
        }
    ];


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
                </div>

                {/* Navigation */}
                <div className="p-4 space-y-1">
                    {profileAction.map((action) => (
                        <div key={action.id}>
                            {action.role.includes(user.role) && (
                                <button
                                    onClick={() => setActiveTab(action.name.toLowerCase())}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === action.name.toLowerCase() ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                                >
                                    {action.icon}
                                    <span className="text-sm font-medium">{action.name}</span>
                                </button>
                            )}
                        </div>
                    ))}

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
        </div >
    )
}

export default ProfileCard