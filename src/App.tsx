/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plane, 
  Hotel, 
  Package, 
  Search, 
  Menu, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  ChevronRight,
  ShieldCheck,
  Headphones,
  CreditCard,
  MousePointer2,
  Home,
  Compass,
  Tag,
  UserCircle,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Types ---
interface Destination {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface TourPackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  maxPeople: string;
  image: string;
  isBestSeller?: boolean;
}

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discountLabel: string;
  image: string;
  badgeType: 'flash' | 'save';
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

// --- Data ---
const DESTINATIONS: Destination[] = [
  { id: '1', name: 'Dubai', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrfym95z1lB3gPFCLggFyFvw0VRu4s2hrRGmd1rL5q5Ftg7b-EYTz7egxznIl3msH_KL7EYePhFz7pu4HMWsdvDHukPsXb_e7rPxRUSr1TF3Ehb-3gnWftcNTNRngGvfXKYCc0DaXmOSa2pAPB7KssO3zRQJ27obGFVlCi8YMc4pap8Sia5lfW4-Z0NDQsdwWn2GFLvP_enaFEOvWYhlnwfUv4eHpA2DxS9kxMX_vCEKphPiZM4JQFtmUfmoOiL2txjon7r9jixs4', alt: 'Dubai skyline' },
  { id: '2', name: 'Bali', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApV-ruvsSvw1niizJGRQveOzzK8OmyoapGIKyCnCNMLNcOl0VjOErNQGVx6zId65lF2B364lVB46oGD6kCSA8C_ReeMzz4R5BJ_66_HC4nW4qMmqn1-zQ_Qwn82BzCij839U8UVrxDXGV02p-izhynrz8V8VoqMtLJRss797WUMZ95qdHk3xDIQTEaaXQzodfUJCyHQTjKJOjh2DIREXpZWeZZKxW0Soq4PE4ANRzdc1vP3lNDOTcDKowCfk5sLr3wiS9kStUOe78', alt: 'Bali temple' },
  { id: '3', name: 'Maldives', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLtc0nVuuzs6eFqWThAQnw06kMEIO3hT4hr6kij0iAhueOebyS_fD-Ox7Lu0faFV9FtTQvmnpLCVA-OwiPTu7AvUMh-Fhnym7y4475n1XsdPLg6noE9dxq-e8saiNdkWcSvZTzGmC8bdO8e_RRnc9eBDqCf-RVcQTLtz1dbrurFSXYOnTST_enRZaWHiM3YJgyoD4YPVZsAWI6z4kiAxtXs6CY6m0Nvh60SCHsghBKVhPclm12zCEFAvIdxeuSYa_IFMyriz8mi6M', alt: 'Maldives resort' },
  { id: '4', name: 'Thailand', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ojVL_GQoSPn158_eNy8UyTqN_fcmfZOtmrQP8nFYEJbvlV9GT92FkRBxbdhTnswyeBODRpqKJRSSunABiQ6bM0budx9qLtADL_dQ2zaDBImkgj0m_-a3lQVeqrRGnfGv0S_9-sw-wnoTqZ-ytVtaL9-DgKHVlSClCT4jnZoJiQr2Nh4i7zttWvjWvhC5Mb3BODzygOq6ieIXcV0DDjXWuN9Df6nHB9-foTREFSqHdDTqNwzw50oypHmpmsoc9RGitQ_1S8E4fi8', alt: 'Thai beach' },
];

const TOUR_PACKAGES: TourPackage[] = [
  {
    id: '1',
    title: 'Golden Triangle: Delhi, Agra, Jaipur',
    price: '₹15,000',
    duration: '5 Days',
    maxPeople: 'Max 10 People',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkb5mwxoULOJopV8q7Vo1nCHi7j3b22vaDip1ptT1AFxAKGzZAhGaYwMHQ28HY8sI1h4aRGjq-wj4ccLTFUZS25J5ETNexL_1iQuaJM2OxGrPMs7XJJfrwyVhsY0YiO-2ndyJrVk-ImEnD_cRlNgBGhkDKZnJ_Imph2izLznTUG3aiohBV6K3CIFEk-VmXvLGe1CwB2cmo3Lp-RhfMl46O6bO5vMYysfKR-nRy2aOEVgkiJduZTISHmqBGCa6jvmbnj4O7JPSqyeU',
    isBestSeller: true
  },
  {
    id: '2',
    title: 'Kerala Backwaters & Hills',
    price: '₹12,500',
    duration: '6 Days',
    maxPeople: 'Max 12 People',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYDmJUuIayedXtTkXlwxoLfrZVUj0VCcvzspVctPNlEvp3Wif9i_BFxhdQava6wykAeyL49uaM4lab3uz5pVt_MgLUJjIKf7fFbbWKpEBrKBXaRDixg_pCYlgziZyMG5u8uwae7TR98eDTadYVXJPiv9ijXFmTGZow2oduEmdfT9RBzLez0OQx2hozFFtVY3zxRQDfIUcigSSan0h98bXbxmZyLFLIqbo-HVLEnhNU7EsAEjcL6AgpohlIPaxFnLciMV72F2MkCWQ'
  }
];

const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: '1',
    title: 'Andaman Island Escape',
    description: 'Discover untouched beaches and vibrant coral reefs in this tropical paradise.',
    originalPrice: '₹24,000',
    discountedPrice: '₹18,000',
    discountLabel: 'Save 25%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ojVL_GQoSPn158_eNy8UyTqN_fcmfZOtmrQP8nFYEJbvlV9GT92FkRBxbdhTnswyeBODRpqKJRSSunABiQ6bM0budx9qLtADL_dQ2zaDBImkgj0m_-a3lQVeqrRGnfGv0S_9-sw-wnoTqZ-ytVtaL9-DgKHVlSClCT4jnZoJiQr2Nh4i7zttWvjWvhC5Mb3BODzygOq6ieIXcV0DDjXWuN9Df6nHB9-foTREFSqHdDTqNwzw50oypHmpmsoc9RGitQ_1S8E4fi8',
    badgeType: 'save'
  },
  {
    id: '2',
    title: 'Ladakh Adventure',
    description: 'Embark on a soul-stirring journey through the high-altitude desert of Ladakh.',
    originalPrice: '₹30,000',
    discountedPrice: '₹22,000',
    discountLabel: 'Flash Sale',
    image: 'https://picsum.photos/seed/ladakh/800/600',
    badgeType: 'flash'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah J.',
    text: '"The Bali trip was perfectly organized. Everything from pickup to hotels was seamless. Highly recommended for a stress-free vacation!"',
    rating: 5
  },
  {
    id: '2',
    name: 'Mark D.',
    text: '"Found the best deals for my Europe tour here. The team was very responsive with my visa queries. Great service!"',
    rating: 4.5
  }
];

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Globe className="text-primary w-8 h-8" />
      <h1 className="text-xl font-extrabold tracking-tight text-primary">
        GLOBAL<span className="text-accent">EXPLORER</span>
      </h1>
    </div>
    <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
      <Menu className="w-6 h-6" />
    </button>
  </header>
);

const Hero = () => {
  const [activeTab, setActiveTab] = useState('Flights');

  return (
    <section className="relative h-[550px] flex flex-col justify-end">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEMLPNxSyzQvOenDvMhfrA6WSmA58g3zXE2Wuim6sQxVhX_MqZDpbd9aIhANOrzwJNfGyczjSAOST6vEefSo62FSq9nrUKA0_zS_y8wuZhEYYVMPERkqljsKY9AGLrSnBpLW0L_s9pIJ0vPDA6WQwhT37-iQdJc7t1RY13KSEYzq95iaQiMVIwErjSwP8om8rK5n9zcKM52L9etI_1kehLHJiHFMH1syOf6MkHb-uTJ2BsSgwCVso641LNFF45bnqqAbhkfOG3sqY" 
          alt="Tropical beach"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/20"></div>
      </div>
      
      <div className="relative z-10 px-4 pb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-white mb-8 leading-tight drop-shadow-md"
        >
          Explore the World <br/>With Us
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-5"
        >
          <div className="flex border-b border-slate-100 dark:border-slate-700 mb-5">
            {['Flights', 'Hotels', 'Packages'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-3">
            <Search className="text-slate-400 w-5 h-5 mr-3" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" 
              placeholder="Where are you going?" 
              type="text" 
            />
          </div>
          
          <button className="w-full mt-5 bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30 active:scale-[0.98]">
            Search Best Deals
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: Plane, label: 'Flight Booking' },
    { icon: Hotel, label: 'Hotel Booking' },
    { icon: Package, label: 'Holidays' },
    { icon: UserCircle, label: 'Visa Help' },
    { icon: ShieldCheck, label: 'Insurance' },
    { icon: Menu, label: 'More' },
  ];

  return (
    <section className="px-4 py-10">
      <h3 className="text-lg font-extrabold mb-8 flex items-center gap-2">
        <span className="w-2 h-6 bg-primary rounded-full"></span>
        Our Premium Services
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all">
              <service.icon className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {service.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Destinations = () => (
  <section className="py-10 bg-slate-100 dark:bg-slate-900/50">
    <div className="px-4 flex justify-between items-center mb-6">
      <h3 className="text-lg font-extrabold">Top Destinations</h3>
      <button className="text-primary text-sm font-bold flex items-center gap-1">
        View All <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <div className="flex overflow-x-auto gap-5 px-4 hide-scrollbar pb-4">
      {DESTINATIONS.map((dest) => (
        <motion.div 
          key={dest.id}
          whileTap={{ scale: 0.95 }}
          className="min-w-[160px] relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg"
        >
          <img 
            className="w-full h-full object-cover" 
            src={dest.image} 
            alt={dest.alt}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <p className="absolute bottom-4 left-4 text-white font-bold text-lg">{dest.name}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const TourPackages = () => (
  <section className="px-4 py-10">
    <h3 className="text-lg font-extrabold mb-8">Featured Tour Packages</h3>
    <div className="space-y-8">
      {TOUR_PACKAGES.map((pkg) => (
        <motion.div 
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700"
        >
          <div className="relative h-56">
            <img 
              className="w-full h-full object-cover" 
              src={pkg.image} 
              alt={pkg.title}
              referrerPolicy="no-referrer"
            />
            {pkg.isBestSeller && (
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Best Seller
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-xl leading-tight flex-1 mr-2">{pkg.title}</h4>
              <span className="text-primary font-extrabold text-xl whitespace-nowrap">{pkg.price}</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {pkg.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" /> {pkg.maxPeople}
              </span>
            </div>
            <button className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]">
              Book Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const SpecialOffers = () => (
  <section className="px-4 py-12 bg-gradient-to-br from-white to-primary/5 dark:from-slate-800 dark:to-primary/10">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-lg font-extrabold uppercase tracking-tight">Special Offers</h3>
      <span className="bg-accent/10 text-accent text-[10px] font-bold px-3 py-1.5 rounded-full">Limited Time</span>
    </div>
    <div className="space-y-8">
      {SPECIAL_OFFERS.map((offer) => (
        <motion.div 
          key={offer.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-primary/5 relative"
        >
          <div className="relative h-64">
            <img 
              className="w-full h-full object-cover" 
              src={offer.image} 
              alt={offer.title}
              referrerPolicy="no-referrer"
            />
            <div className={`absolute top-4 right-4 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-lg transform ${
              offer.badgeType === 'save' ? 'bg-red-600 rotate-3' : 'bg-accent -rotate-3'
            }`}>
              {offer.discountLabel}
            </div>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-2xl mb-2">{offer.title}</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{offer.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 line-through">{offer.originalPrice}</span>
                <div className="text-primary font-extrabold text-3xl">{offer.discountedPrice}</div>
              </div>
              <button className="bg-primary text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-primary/20 active:scale-[0.95]">
                Claim Offer
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const WhyChooseUs = () => {
  const features = [
    { icon: CreditCard, title: 'Best Price', desc: 'Price match guarantee on all tours' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our team is always here to help you' },
    { icon: MousePointer2, title: 'Easy Booking', desc: 'Secure online booking in minutes' },
    { icon: ShieldCheck, title: 'Trusted Experts', desc: '15+ years of travel experience' },
  ];

  return (
    <section className="bg-primary px-4 py-16 text-white">
      <h3 className="text-center text-2xl font-extrabold mb-12">Why Choose Global Explorer?</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12">
        {features.map((f, i) => (
          <div key={i} className="text-center flex flex-col items-center">
            <f.icon className="text-accent w-10 h-10 mb-4" />
            <p className="font-bold text-base mb-1">{f.title}</p>
            <p className="text-[11px] text-slate-300 leading-tight px-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="px-4 py-16 bg-slate-50 dark:bg-slate-900/30">
    <h3 className="text-center text-xl font-extrabold mb-10">What Our Clients Say</h3>
    <div className="space-y-6">
      {TESTIMONIALS.map((t) => (
        <motion.div 
          key={t.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 italic text-sm text-slate-600 dark:text-slate-300"
        >
          <div className="flex text-accent mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(t.rating) ? 'fill-accent' : ''}`} />
            ))}
          </div>
          {t.text}
          <div className="mt-5 font-bold text-primary not-italic text-base">— {t.name}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

const CTA = () => (
  <section className="px-4 py-16 bg-accent/10 border-y border-accent/20">
    <div className="text-center max-w-sm mx-auto">
      <h3 className="text-3xl font-extrabold text-primary mb-5">Book Your Dream Trip Today</h3>
      <p className="text-base text-slate-600 mb-8">Let us help you plan an unforgettable journey customized to your needs.</p>
      <button className="bg-primary text-white font-bold px-10 py-4 rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
        Contact Us Now
      </button>
    </div>
  </section>
);

const InquiryForm = () => (
  <section className="px-4 py-16">
    <h3 className="text-xl font-extrabold mb-8">Send an Inquiry</h3>
    <form className="space-y-5 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-2 ml-1">Full Name</label>
        <input 
          className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary transition-all outline-none" 
          placeholder="Enter your name" 
          type="text" 
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-2 ml-1">Email Address</label>
        <input 
          className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary transition-all outline-none" 
          placeholder="your@email.com" 
          type="email" 
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-400 mb-2 ml-1">Message</label>
        <textarea 
          className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary transition-all outline-none resize-none" 
          placeholder="How can we help you?" 
          rows={4}
        ></textarea>
      </div>
      <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" type="submit">
        Send Message
      </button>
    </form>
    
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
          <p className="font-extrabold text-lg text-slate-800 dark:text-slate-200">+1 (800) 123-4567</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
          <p className="font-extrabold text-lg text-slate-800 dark:text-slate-200">hello@globalexplorer.com</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 px-4 pt-16 pb-32">
    <div className="flex flex-col items-center gap-8 mb-12">
      <div className="flex items-center gap-2">
        <Globe className="text-white w-8 h-8" />
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          GLOBAL<span className="text-accent">EXPLORER</span>
        </h1>
      </div>
      <div className="flex gap-8">
        <Facebook className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
        <Instagram className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
        <Twitter className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 text-center text-[11px] font-bold uppercase tracking-widest border-t border-slate-800 pt-10 mb-10">
      <a className="hover:text-white transition-colors" href="#">About</a>
      <a className="hover:text-white transition-colors" href="#">Privacy</a>
      <a className="hover:text-white transition-colors" href="#">FAQ</a>
    </div>
    <p className="text-center text-[10px] opacity-50">© 2024 Global Explorer Agency. All Rights Reserved.</p>
  </footer>
);

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
    <a className="flex flex-col items-center gap-1 text-primary" href="#">
      <Home className="w-6 h-6" />
      <span className="text-[10px] font-bold">Home</span>
    </a>
    <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
      <Compass className="w-6 h-6" />
      <span className="text-[10px] font-bold">Tours</span>
    </a>
    <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
      <Tag className="w-6 h-6" />
      <span className="text-[10px] font-bold">Deals</span>
    </a>
    <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
      <UserCircle className="w-6 h-6" />
      <span className="text-[10px] font-bold">Account</span>
    </a>
  </nav>
);

const WhatsAppButton = () => (
  <motion.a 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-20 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors" 
    href="https://wa.me/919080985296"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.801.982 3.848 1.5 5.922 1.5h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
    </svg>
  </motion.a>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Destinations />
        <TourPackages />
        <SpecialOffers />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
        <InquiryForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}
