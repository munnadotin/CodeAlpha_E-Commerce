import type { User } from "../../types/auth.type"

interface ProfileContentProps {
    user: User
}

function ProfileContent({ user }: ProfileContentProps) {
    if (!user) return null;
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <p className="text-gray-900 bg-gray-50 px-4 py-2.5 rounded-lg">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <p className="text-gray-900 bg-gray-50 px-4 py-2.5 rounded-lg">{user.email}</p>
                    </div>
                </div>
                {/* 
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                    <p className="text-gray-900 bg-gray-50 px-4 py-2.5 rounded-lg">{user.address}</p>
                </div> */}

                <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default ProfileContent