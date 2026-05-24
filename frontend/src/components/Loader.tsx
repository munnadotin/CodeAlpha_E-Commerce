function CirLoader() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-32">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                        <div className="w-12 h-12 border border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-12 h-12 border border-gray-100 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-400 tracking-wide">Loading collection...</p>
                </div>
            </div>
        </div>
    )
}

export default CirLoader