// 'use client'
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useFeeData, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction, useAccount } from 'wagmi'
// import { parseEther } from 'viem';
// import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

// interface IModalContext {
//   isModalOpen: boolean;
//   openModal: () => void;
//   closeModal: () => void;
//   modalContent: ReactNode | null;
//   handleSubmit: (event: { preventDefault: () => void; }) => Promise<void>;
//   isSuccess: boolean;
// }

// const ModalContext = createContext<IModalContext>({} as IModalContext);

// interface ModalProviderProps {
//   children: ReactNode;
// }

// export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState<ReactNode | null>(null);

//   const [isIdle, setIsIdle] = useState(true);
//   const [isSigning, setIsSigning] = useState(false);
//   const [isFetching, setIsFetching] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const feeData = useFeeData({
//     chainId: 3,
//   })

// //   const { config } = usePrepareSendTransaction({
// //     data: '0x',
// //     to: '0x0bc58805c5e5b1b020afe6013eeb6bcda74df7f0',
// //     value: parseEther('0.0001'),
// //     gasPrice: feeData.data?.maxFeePerGas ?? undefined,
// //   })

// //   const { data, isLoading, sendTransaction } = useSendTransaction(config)

// //   const transactionHash = data?.hash

// //   const { isIdle, isSuccess, isFetching, isError, isFetched } = useWaitForTransaction({
// //     hash: transactionHash,
// //   })

//   const { primaryWallet } = useDynamicContext();

//   const handleSubmit = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault();

//     setIsIdle(false)
//     setIsSigning(true);

//     if (!primaryWallet) {
//         return;
//     }
    
//     const { connector, address } = primaryWallet;
    
//     if (!isZeroDevConnector(connector)) {
//         return;
//     }
    
//     const ecdsaProvider = connector.getAccountAbstractionProvider();
    
//     if (!ecdsaProvider) {
//         return;
//     }

//     try {
//         const result = await ecdsaProvider.sendUserOperation({
//             target: '0x0bc58805c5e5b1b020afe6013eeb6bcda74df7f0',
//             data: '0x',
//             value: parseEther('0.0001'),
//             gasPrice: feeData.data?.maxFeePerGas ?? undefined,
//         });

//         setIsSigning(false)
//         setIsFetching(true)

//         if (result && result.hash) {
//             // Start polling for the receipt after a delay
//             setTimeout(() => checkComplete(result.hash), 5000); // Adjust the delay as necessary
//           } else {
//             console.error('Error sending transaction:');
//             setIsFetching(false);
//             setIsError(true);
//           }
//         } catch (error) {
//           console.error('Error sending transaction:', error);
//           setIsFetching(false);
//           setIsError(true);
//         }

//         const checkComplete = async (hash, attempts = 5) => {
//             let result; // Initialize the receipt variable outside the loop
//             for (let i = 0; i < attempts; i++) {
//               try {
//                 result = await ecdsaProvider.waitForUserOperationTransaction(hash);
//                 if (result) {
//                    console.log('Transaction successful:', result);
//                    setIsSuccess(true);
//                   break; // Exit the loop if a successful receipt is found
//                 } else if (!result) {
//                   console.error('Transaction failed:', result);
//                   setIsError(true);
//                   break; // Exit the loop if a receipt indicates failure
//                 }
//               } catch (error) {
//                 console.error('Attempt to fetch result failed:', error);
//                 // Optionally, handle specific errors differently here
//               }
//               if (i < attempts - 1) {
//                 await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay before the next attempt
//               }
//             }
          
//             setIsFetching(false);
//             // Set error state if no successful result was found after all attempts
//             if (!result) {
//               setIsError(true);
//               console.error('No successful result was found after all attempts')
//             }
//           };
          
//     // try {
//     //   const tx = await sendTransaction
//     //   console.log('Transaction:', data);
//     // } catch (error) {
//     //   console.error('Transaction error:', error);
//     //   alert('Transaction failed: ' + error.message);
//     // }
//   };

// //   const { isIdle, isSuccess, isFetching, isError, isFetched } = useWaitForTransaction({
// //     hash: `0x${transactionHash}`,
// //   })

//   useEffect(() => {

//     if (isIdle) {
//         setModalContent('Idle');
//     }
//     if (isSigning) {
//         setModalContent('Signing');
//     }
//     if (isFetching) {
//         setModalContent('Sending');
//     }
//     if (isSuccess) {
//         setModalContent('Success');
//     }
//     if (isError) {
//         setModalContent('Failed');
//     }
//   }, [isIdle, isSigning, isFetching, isSuccess, isError]);

//   return (
//     <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent, handleSubmit, isSuccess}}>
//       {children}
//     </ModalContext.Provider>
//   );
// };

// export const useModal = () => useContext(ModalContext);
