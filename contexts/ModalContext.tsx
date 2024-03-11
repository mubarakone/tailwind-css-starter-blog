'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFeeData, useWalletClient, useSignMessage, useAccount, } from 'wagmi'
import { parseEther } from 'viem';
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { providerToSmartAccountSigner } from 'permissionless';
import { useEthersSigner } from '../adapters/useEthersSigner'
import { SignerOrProvider } from '@ethereum-attestation-service/eas-sdk/dist/transaction';


interface IModalContext {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
  handleSubmit: (event: { preventDefault: () => void; }) => Promise<void>;
  isSuccess: boolean;
  transactionHash: ReactNode | null;
  errorMsg: ReactNode | null;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const [isIdle, setIsIdle] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [transactionHash, setTransactionHash] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [savedArticle, setSavedArticle] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const feeData = useFeeData({
    chainId: 3,
  })

//   const { config } = usePrepareSendTransaction({
//     data: '0x',
//     to: '0x0bc58805c5e5b1b020afe6013eeb6bcda74df7f0',
//     value: parseEther('0.0001'),
//     gasPrice: feeData.data?.maxFeePerGas ?? undefined,
//   })

//   const { data, isLoading, sendTransaction } = useSendTransaction(config)

//   const transactionHash = data?.hash

//   const { isIdle, isSuccess, isFetching, isError, isFetched } = useWaitForTransaction({
//     hash: transactionHash,
//   })

  const { primaryWallet } = useDynamicContext();
  const { address, isConnecting, isDisconnected } = useAccount()
  const signer = useEthersSigner();

  useEffect(() => {
    const storedValue = localStorage.getItem('savedArticle');

    if (storedValue) {
      // Parse the JSON string back to an object
      const data = JSON.parse(storedValue);
      setSavedArticle(data)
  } else {
      console.log('No data found in localStorage for key "savedArticle"');
  }
  })

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setIsIdle(false)
    setIsSigning(true);

    // if (!primaryWallet) {
    //     return;
    // }
    
    // const { connector, address } = primaryWallet;
    
    // if (!isZeroDevConnector(connector)) {
    //     return;
    // }

    // const dynamicProvider = await primaryWallet?.connector?.getWalletClient();

    // const smartAccountSigner = await providerToSmartAccountSigner(dynamicProvider);
    
    // const ecdsaProvider = connector.getAccountAbstractionProvider();
    
    // if (!ecdsaProvider) {
    //     return;
    // }

    if (!address) {
      return;
    }

    if (!signer) {
      return
    }

    const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
    const schemaUID = "0x0f56703f9857e3309b852d83c412dbc1176b028898226960fe2b89c6a92711fc";
    const eas = new EAS(easContractAddress);
    // @ts-ignore
    await eas.connect(signer);

    const schemaEncoder = new SchemaEncoder("string publisher, string author, string article, uint256 readTime");
    const encodedData = schemaEncoder.encodeData([
      { name: "publisher", value: "", type: "string" },
      { name: "author", value: "", type: "string" },
      { name: "article", value: savedArticle, type: "string" },
      { name: "readTime", value: "0", type: "uint256" },
    ]);

    const myBigInt: bigint = BigInt(0);
    
    try {
        const tx = await eas.attest({
          schema: schemaUID,
          data: {
            recipient: "0x0BC58805c5e5B1b020AfE6013Eeb6BcDa74DF7f0",
            expirationTime: myBigInt,
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
          },
        });

        setIsSigning(false)
        setIsFetching(true)

        if (tx) {
            // Start polling for the receipt after a delay
            setTimeout(() => checkComplete(tx), 5000); // Adjust the delay as necessary
          } else {
            console.error('Error sending transaction:');
            setIsFetching(false);
            setIsError(true);
          }
        } catch (error) {
          console.error('Error sending transaction:', error);
          setErrorMsg(error)
          setIsFetching(false);
          setIsError(true);
        }

        const checkComplete = async (tx, attempts = 5) => {
            let result; // Initialize the receipt variable outside the loop
            for (let i = 0; i < attempts; i++) {
              try {
                result = await tx.wait();;
                if (result) {
                   console.log('Transaction successful:', result);
                   setTransactionHash(result)
                   setIsSuccess(true);
                  break; // Exit the loop if a successful receipt is found
                } else if (!result) {
                  console.error('Transaction failed:', result);
                  setErrorMsg(result)
                  setIsError(true);
                  break; // Exit the loop if a receipt indicates failure
                }
              } catch (error) {
                console.error('Attempt to fetch result failed:', error);
                setErrorMsg(error)
                // Optionally, handle specific errors differently here
              }
              if (i < attempts - 1) {
                await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay before the next attempt
              }
            }
          
            setIsFetching(false);
            // Set error state if no successful result was found after all attempts
            if (!result) {
              setErrorMsg(result)
              setIsError(true);
              console.error('No successful result was found after all attempts')
            }
          };
          
    // try {
    //   const tx = await sendTransaction
    //   console.log('Transaction:', data);
    // } catch (error) {
    //   console.error('Transaction error:', error);
    //   alert('Transaction failed: ' + error.message);
    // }
  };

//   const { isIdle, isSuccess, isFetching, isError, isFetched } = useWaitForTransaction({
//     hash: `0x${transactionHash}`,
//   })

  useEffect(() => {

    if (isIdle) {
        setModalContent('Idle');
    }
    if (isSigning) {
        setModalContent('Signing');
    }
    if (isFetching) {
        setModalContent('Sending');
    }
    if (isSuccess) {
        setModalContent('Success');
    }
    if (isError) {
        setModalContent('Failed');
    }
  }, [isIdle, isSigning, isFetching, isSuccess, isError]);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent, handleSubmit, isSuccess, transactionHash, errorMsg}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
