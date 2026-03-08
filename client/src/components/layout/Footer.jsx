import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary-bg/50 border-t border-border-color pt-16 pb-8 mt-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-lg mb-2">About</h3>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">About CinemaX</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Blog</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Press</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Careers</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-lg mb-2">Support</h3>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Help Center</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Contact Us</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">FAQ</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Account</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-lg mb-2">Legal</h3>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Terms of Service</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Cookie Preferences</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Accessibility</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-lg mb-2">Connect</h3>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Twitter</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Facebook</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">Instagram</Link>
                        <Link to="#" className="text-text-secondary hover:text-accent-gold transition-colors">YouTube</Link>
                    </div>

                </div>

                <div className="border-t border-border-color pt-8 text-center text-text-secondary text-sm">
                    <p>&copy; {new Date().getFullYear()} CinemaX. All rights reserved. Premium Streaming Experience.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
