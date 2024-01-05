 import { SubscriptionAd } from "./SubscriptionAd";

 export const Paywall = ({ isOpen, onClose, isPaywallOpen, children }) => {
    if (!isOpen) return null;
  
    return (
        <div className={`fixed inset-0 bg-gradient-to-r from-sky-500 to-pink-400 transition-opacity duration-500 ease-in-out ${isPaywallOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white p-5 border-t shadow-lg">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Subscription Required</h3>
            <p className="mt-2 text-sm text-gray-500">
                Access to this content requires a subscription. Please subscribe to continue reading.
            </p>
            <div className="mt-4">
              <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
              {/* Add more buttons or links for subscription options */}
            </div>
          </div>
          {children}
        </div>
    );
  };
  