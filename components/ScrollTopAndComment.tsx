// 'use client'

// import siteMetadata from '@/data/siteMetadata'
// import { useEffect, useState } from 'react'
// import { Paywall } from './Paywall'
// import { SubscriptionAd } from './SubscriptionAd'
// import { useModal } from 'contexts/ModalContext'

// const ScrollTopAndComment = () => {
//   const [show, setShow] = useState(false)
//   const [isPaywallOpen, setIsPaywallOpen] = useState(false);
//   const [showPaywallContent, setShowPaywallContent] = useState(false);

//   const { isSuccess } = useModal()

//   const paywallThreshold = 300;

//   useEffect(() => {
//     // Function to handle scrolling logic when isSuccess is true
//     const handleSuccessScroll = () => {
//       setShow(window.scrollY > 50);
//     };
  
//     // Function to handle paywall logic when isSuccess is false
//     const handlePaywallScroll = () => {
//       if (window.scrollY > paywallThreshold) {
//         setIsPaywallOpen(true);
//         setTimeout(() => setShowPaywallContent(true), 300);
//       }
//     };
  
//     // Conditional event listener binding
//     if (isSuccess) {
//       // When isSuccess is true, we listen for scrolling to toggle `setShow`.
//       window.addEventListener('scroll', handleSuccessScroll);
//     } else {
//       // When isSuccess is false, we handle paywall scrolling logic.
//       window.addEventListener('scroll', handlePaywallScroll);
//     }
  
//     // Control the body scroll based on the paywall state
//     document.body.style.overflow = isPaywallOpen && !isSuccess ? 'hidden' : '';
  
//     // Cleanup function
//     return () => {
//       window.removeEventListener('scroll', handleSuccessScroll);
//       window.removeEventListener('scroll', handlePaywallScroll);
//     };
//   }, [isSuccess, isPaywallOpen, paywallThreshold]); // Dependencies for all related logic
  
//   // Still, keep separate state updates for isSuccess
//   useEffect(() => {
//     if (isSuccess) {
//       setIsPaywallOpen(false);
//       setShowPaywallContent(false);
//     }
//   }, [isSuccess]);
  
  

//   const handleScrollTop = () => {
//     window.scrollTo({ top: 0 })
//   }
//   const handleScrollToComment = () => {
//     document.getElementById('comment')?.scrollIntoView()
//   }

//   return (
//     <div>
//       <Paywall onClose={() => setIsPaywallOpen(false)} isOpen={!isSuccess} isPaywallOpen={isPaywallOpen}>
//           <SubscriptionAd />
//         </Paywall>
//       <div
//         className={`fixed bottom-8 right-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
//       >
//         {siteMetadata.comments?.provider && (
//           <button
//             aria-label="Scroll To Comment"
//             onClick={handleScrollToComment}
//             className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
//           >
//             <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         )}
//         <button
//           aria-label="Scroll To Top"
//           onClick={handleScrollTop}
//           className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
//         >
//           <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path
//               fillRule="evenodd"
//               d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ScrollTopAndComment
