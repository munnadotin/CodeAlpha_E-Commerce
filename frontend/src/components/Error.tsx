import type { NavigateFunction } from "react-router-dom";

type Props = {
    error: string;
    navigate: NavigateFunction;
};

function Error({ error, navigate }: Props) {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-light text-gray-900 mb-2">Unable to Load Products</h2>
                <p className="text-gray-400 mb-8">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default Error;