'use client'
import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useModal } from '../contexts/ModalContext';
import Image from 'next/image'
import { useFeeData } from 'wagmi'

const ModalContent = React.forwardRef<HTMLButtonElement>((props, forwardRef) => {
  const { isModalOpen, closeModal, modalContent, handleSubmit } = useModal();

  const feeData = useFeeData({
    chainId: 3,
    formatUnits: 'gwei',
    watch: true,
  })

    function IdleTransaction() {
        return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
            <Image alt='Ether' src={'/eth.svg'} width={24} height={24} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Send 0.0001 ETH + {feeData.data?.formatted?.gasPrice} ETH in fees
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to send 0.0001 ETH to 0x0bc...7f0?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
          onClick={handleSubmit}
        >
            Send
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={closeModal}
          ref={forwardRef}
        >
            Cancel
        </button>
      </div>
    </Dialog.Panel>
        )
    }

    function SigningTransaction() {
        return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <Image alt='Ether' src={'/eth.svg'} width={24} height={24} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Waiting for your signature...
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Sign with your passkey. Follow your the instructions on your device or computer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog.Panel>
        )
    }

    function SendingTransaction() {
        return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <Image alt='Ether' src={'/eth.svg'} width={24} height={24} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Sending...
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Sending 0.0001 ETH to 0x0bc...7f0
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog.Panel>
        )
    }

    function SuccessfulTransaction() {
        return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <Image alt='Ether' src={'/eth.svg'} width={24} height={24} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Success!
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
              0.0001 ETH has been sent to 0x0bc...7f0
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={closeModal}
          ref={forwardRef}
        >
            Cancel
        </button>
      </div>
    </Dialog.Panel>
        )
    }

    function FailedTransaction() {
        return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <Image alt='Ether' src={'/eth.svg'} width={24} height={24} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
              Failed
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
              0.0001 ETH to 0x0bc...7f0 has failed!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={closeModal}
          ref={forwardRef}
        >
            Cancel
        </button>
      </div>
    </Dialog.Panel>
        )
    }


  return (<>
     {((modalContent == 'Idle') && <IdleTransaction />)};
     {((modalContent == 'Signing') && <SigningTransaction />)};
     {((modalContent == 'Sending') && <SendingTransaction />)};
     {((modalContent == 'Success') && <SuccessfulTransaction />)};
     {((modalContent == 'Failed') && <FailedTransaction />)};
     {((modalContent == 'Error') && <FailedTransaction />)};
  </>);

  }
)

ModalContent.displayName = 'ModalContent'

export default ModalContent