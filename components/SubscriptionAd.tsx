import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { useAccount, useBalance } from 'wagmi'
import Modal from './Modal';
import { useModal } from 'contexts/ModalContext';
import { Suspense } from 'react';

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
        <div className="fixed inset-x-0 flex items-center justify-center p-4 lg:top-[300px] md:top-[300px] sm:top-[300px]">
          <div className="text-center"> {/* This div will center the content vertically and horizontally */}
            <h2 className="text-6xl font-extrabold text-white mb-4 text-shadow-white-lg text-stroke-0 text-stroke-color-black">
              Unlimited Article Access
            </h2>
            <p className="text-4xl font-extrabold text-white mb-4 text-shadow-white-lg text-stroke-0 text-stroke-color-black">
              Dive into knowledge for just $0.01 per read. Experience the richness of well-crafted journalism today.
            </p>
            <p className="font-extrabold text-2xl text-white text-shadow-white-lg text-stroke-0 text-stroke-color-black">
              *Special rate available for a limited time
            </p>
            {address
              ? <button 
                  disabled={isSuccess} 
                  onClick={openModal} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  $0.01
                </button>
              : <div className='flex justify-center'>
                  <Suspense fallback={<p>Loading wallet...</p>}>
                    <DynamicWidget innerButtonComponent={'Subscribe'} />
                  </Suspense>
                  
                </div> 
            }
          </div>
        </div>
      );      
  };
  