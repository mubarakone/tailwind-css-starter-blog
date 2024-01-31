'use client'
import React, { Suspense } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { useModal } from '../contexts/ModalContext';
import Image from 'next/image'
import { useFeeData } from 'wagmi'

const ModalContent = React.forwardRef<HTMLButtonElement>((props, forwardRef) => {
  const { isModalOpen, closeModal, modalContent, handleSubmit, transactionHash, errorMsg } = useModal();

  const feeData = useFeeData({
    chainId: 11155111,
    formatUnits: 'gwei',
    watch: true,
  })

  const totalAmount = "00.01"

  function truncateString(str) {
    if (str) {
        return str.slice(0, 5) + '...' + str.slice(-3);
    }
    return;
  }

  const truncatedTransactionHash = truncateString(transactionHash);

  // const truncatedErrorMsg = truncateString(errorMsg);

    function IdleTransaction() {
        return (
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 sm:px-4 pb-4 pt-5">
              {/* Send button for small screens */}
              <div className="sm:hidden">
                <button
                  type="button"
                  className="mb-4 w-full justify-center rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
              <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 text-center">
                Confirm Transaction
              </Dialog.Title>
            </div>
              <div className="flex flex-col sm:flex-row sm:space-x-2 px-4 mt-4 space-y-4 sm:space-y-0">
                <div className="flex-1 bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-semibold text-gray-700">FROM (&lt;- you)</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Address: <span className="font-semibold">0x123...abc</span>
                  </p>
                </div>

                <div className="flex-1 bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-yellow-700">Amount</h4>
                  <p className="text-sm text-yellow-600 mt-2">
                    Sending: <span className="font-semibold">${totalAmount}</span>
                  </p>
                </div>

                <div className="flex-1 bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-semibold text-gray-700">TO</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Address: <span className="font-semibold">0x0bc...7f0</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 px-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700">Transaction Details</h4>
                <div className="flex justify-between items-baseline">
                  <p className="text-xs text-blue-600">
                    Network Fees:
                  </p>
                  <p className="p-4 text-xs text-blue-600">
                    <Suspense fallback={<p>Loading...</p>}>&lt;&lt;&lt; $00.01</Suspense>
                  </p>
                </div>
                <div className="flex justify-between items-baseline mt-2">
                  <p className="text-lg font-semibold text-blue-700 uppercase">
                    Total:
                  </p>
                  <p className="text-xl font-bold text-blue-700 animate-pulse">
                    ~${totalAmount}
                  </p>
                </div>
                <p className="text-xs text-blue-600 text-right mt-1">
                  (Amount + Fees)
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {/* Send button for larger screens */}
                <button
                  type="button"
                  className="hidden sm:inline-flex justify-center rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 w-full sm:w-auto"
                  onClick={handleSubmit}
                >
                  Send
                </button>
                <button
                  type="button"
                  className="mt-3 sm:mt-0 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto"
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
                <Image alt='Signature' src={'/signature-icon.svg'} width={24} height={24} />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                  Signature Required
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please sign the transaction with your passkey. Follow the instructions on your mobile device or computer to complete the process.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Waiting for signature confirmation...
              </p>
            </div>
          </div>
        </Dialog.Panel>        
        )
    }

    function SendingTransaction() {
        return (
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-full md:max-w-lg lg:max-w-xl">
          <div className="bg-white px-4 sm:px-6 pb-4 pt-5">
            <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 text-center">
              Sending...
            </Dialog.Title>
            <div className="flex justify-between items-center mt-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-700">FROM</h4>
                <p className="text-sm text-gray-600">
                  Address: <span className="font-semibold">0x123...abc</span>
                </p>
              </div>
              <div className="flex-1 text-center">
                {/* Placeholder for transaction animation */}
                <div className="inline-block w-8 h-8 bg-blue-200 rounded-full animate-bounce"></div>
              </div>
              <div className="flex-1 text-right">
                <h4 className="font-semibold text-gray-700">TO</h4>
                <p className="text-sm text-gray-600">
                  Address: <span className="font-semibold">0x0bc...7f0</span>
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Sending ${totalAmount} to 0x0bc...7f0
              </p>
            </div>
          </div>
        </Dialog.Panel>        
        )
    }

    function SuccessfulTransaction() {
        return (
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-full md:max-w-lg lg:max-w-xl">
          <div className="bg-white px-4 sm:px-6 pb-4 pt-5 text-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <Image alt='Success' src={'/success-icon.svg'} width={48} height={48} />
              </div>
              <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mt-3">
                Transaction Successful!
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-2">
                ${totalAmount} has been sent to 0x0bc...7f0
              </p>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 mx-auto max-w-md">
              <h4 className="font-semibold text-green-700">Transaction Details</h4>
              <p className="text-sm text-green-600">
                Amount: <span className="font-semibold">${totalAmount}</span>
              </p>
              <p className="text-sm text-green-600">
                To: <span className="font-semibold">0x0bc...7f0</span>
              </p>
              <p className="text-sm text-green-600 flex">
                Transaction ID: 
                <span className="font-semibold ml-1">
                  <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {truncatedTransactionHash}
                    <svg width="16" height="16" viewBox="0 0 24 24" className="ml-1">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M14 3v2h5.59L10.5 14.09l1.41 1.41L21 6.41V12h2V3z"/>
                    </svg>
                  </a>
                </span>
              </p>
              <p className="text-sm text-green-600">
                Date & Time: <span className="font-semibold">[Date & Time]</span>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
              onClick={closeModal}
              ref={forwardRef}
            >
              Close
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
                <Image alt='Transaction Failed' src={'/error-icon.svg'} width={24} height={24} />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                  Transaction Failed
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your transaction could not be completed.
                  </p>
                  <p className="text-sm text-red-500 mt-2">
                    Reason: <span className="font-semibold">Check the console.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Please review the transaction details and try again.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
              onClick={closeModal}
              ref={forwardRef}
            >
              Close
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