
const Footer = () => {
    return (

        <div>
            <div className="bg-slate-100 flex justify-center items-center py-5 px-10">
                <div className="flex space-x-28">
                    <div >
                        <h1 className="font-semibold">Popular Locations</h1>
                        <li>Kolakata</li>
                        <li>Mumbai</li>
                        <li>Chennai</li>
                        <li>Pune</li>
                    </div>
                    <div>
                        <h1 className="font-semibold">Trending Locations</h1>
                        <li>Bhubaneshwar</li>
                        <li>Hyderabad</li>
                        <li>Chandigarh</li>
                        <li>Nashik</li>
                    </div>
                    <div>
                        <h1 className="font-semibold">About Us</h1>
                        <li>tech@OLX</li>
                    </div>
                    <div>
                        <h1 className="font-semibold">OLX</h1>
                      
                        <li>Blogs</li>
                        <li>Help</li>
                        <li>Sitemap</li>
                        <li>Legal & Privacy Information</li>
                        <li>Vulnerability disclosure program</li>
                    </div>
                </div>
            </div>

            <div className="bg-cyan-950 h-20">
                <h1 className="text-white p-4 text-xs">All rights reserved &copy; 2006-2024 OLX</h1>
            </div>
        </div>
    )
}

export default Footer
