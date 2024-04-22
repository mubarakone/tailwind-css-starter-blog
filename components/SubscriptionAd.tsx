import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { useAccount, useBalance } from 'wagmi'
import Modal from './Modal';
import { useModal } from 'contexts/ModalContext';
import { Suspense } from 'react';
import Image from 'next/image';

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
            <h2 className="text-6xl font-extrabold text-amber-200 mb-4 text-shadow-black-lg text-stroke-0 text-stroke-color-black">
              Tip to Read!
            </h2>
            <p className="text-xl font-extrabold text-amber-200 mb-4 text-shadow-black-lg text-stroke-0 text-stroke-color-black">
              Just give a small tip to read your favorite articles. Please have at least <span className='text-white'>$0.00</span> in your wallet to continue reading.
            </p>
                <button 
                  disabled={isSuccess} 
                  onClick={openModal} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline space-x-1"
                >
                  <Image className="inline-block" alt='tip' src={'/coin-vertical-svgrepo-com (1).svg'} width={24} height={24} />
                  <span className="inline-block">$0.01</span>
                </button>
          </div>
        </div>
      );      
  };
  