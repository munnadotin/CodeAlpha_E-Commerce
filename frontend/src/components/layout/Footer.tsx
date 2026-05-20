import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className='bg-black pt-20 px-4'>
            <footer className="bg-[#131314] w-full max-w-337.5 mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">

                    <div className="lg:col-span-3 space-y-6">
                        <Link to={'/'} className="text-2xl font-normal tracking-wider text-gray-200 cursor-pointer">ALPHA<span className="font-light text-gray-500">STORE</span></Link>
                        <div className="flex gap-5 mt-4 md:gap-6 order-1 md:order-2">
                            {/* X (Twitter) */}
                            <Link to="#" className="text-white hover:text-gray-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </Link>
                            {/* Github */}
                            <Link to="#" className="text-white hover:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </Link>
                            {/* Linkedin */}
                            <Link to="#" className="text-white hover:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                                </svg>
                            </Link>
                            {/* Youtube */}
                            <Link to="#" className="text-white hover:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
                        {/* Products */}
                        <div>
                            <h3 className="font-medium text-sm mb-4">Products</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><a href="#" className="hover:text-neutral-400">All Products</a></li>
                                <li><a href="#" className="hover:text-neutral-400">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-neutral-400">Best Sellers</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="font-medium text-sm mb-4">Resources</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><Link to="#" className="hover:text-neutral-400">Documentation</Link></li>
                                <li><Link to="#" className="hover:text-neutral-400">Tutorials</Link></li>
                                <li><Link to="#" className="hover:text-neutral-400">Guides</Link></li>
                                <li><Link to="#" className="hover:text-neutral-400">Support</Link></li>
                                <li><Link to="#" className="hover:text-neutral-400">Community</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="font-medium text-sm mb-4">Company</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><Link to="#" className="hover:text-neutral-400">About</Link></li>
                                <li><Link to="#" className="hover:text-neutral-400">Vision</Link></li>
                                <li className="flex items-center gap-2">
                                    <Link to="#" className="hover:text-neutral-400">Careers</Link>
                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-950 border border-green-300 text-green-300">HIRING</span>
                                </li>
                                <li><Link to="#" className="hover:text-neutral-400">Privacy policy</Link></li>
                                <li><Link to="#" className="hover:text-neutral-400">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 py-2 border-t border-neutral-700 flex justify-between items-center">
                    <Link to={'/'} className="text-xl font-normal tracking-wider text-gray-300 cursor-pointer">ALPHA<span className="font-light text-gray-500">STORE</span></Link>
                    <p className='text-sm text-neutral-400'>All right reserved.</p>
                </div>
            </footer>
        </div>

    )
}
