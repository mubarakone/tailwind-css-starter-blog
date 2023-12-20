import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { useAccount, useBalance } from 'wagmi'
import Modal from './Modal';
import { useModal } from 'contexts/ModalContext';

export const SubscriptionAd = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBalance({
        address: address,
        chainId: 5,
      })
    const { isModalOpen, openModal, modalContent, isSuccess } = useModal();

    console.log({address})
    console.log({data})

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 inset-x-0 top-150">
          <div className="text-center"> {/* This div will center the content vertically and horizontally */}
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Unlimited Article Access
            </h2>
            <p className="text-lg text-white mb-4">
              Dive into knowledge for just 0.0001 ETH per read. Experience the richness of well-crafted journalism today.
            </p>
            <p className="font-semibold text-sm text-white">
              *Special rate available for a limited time
            </p>
            {address
              ? <button 
                  disabled={isSuccess} 
                  onClick={openModal} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  0.0001 ETH
                </button>
              : <div className='flex justify-center'>
                  <DynamicWidget innerButtonComponent={'Subscribe'} />
                </div> 
            }
          </div>
        </div>
      );      
  };
  