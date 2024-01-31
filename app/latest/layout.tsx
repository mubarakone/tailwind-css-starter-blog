import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from '../theme-providers'
import { DynamicProvider } from '../DynamicProvider'
import { ModalProvider } from 'contexts/ModalContext'
import Modal from '@/components/Modal'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
        <DynamicProvider>
          <ThemeProviders>
            <ModalProvider>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <SectionContainer>
              <div className="flex h-screen flex-col justify-between font-sans">
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header style={{ zIndex: 20 }} />
                <Modal />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
          </ModalProvider>
        </ThemeProviders>
      </DynamicProvider>
  )
}
