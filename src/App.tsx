import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { Overview } from '@/components/overview'
import { DesignPhase } from '@/components/design-phase'
import { BuildPhase } from '@/components/build-phase'
import { CodePhase } from '@/components/code-phase'
import { QAPhase } from '@/components/qa-phase'
import { DeployPhase } from '@/components/deploy-phase'
import { MonitorPhase } from '@/components/monitor-phase'
import { KPIData } from '@/types'
import DataManager from '@/lib/data-manager'
import '@/index.css'

function App() {
  const [data, setData] = useState<KPIData>(() => DataManager.getInstance().getData())

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    
    // Subscribe to data updates
    const unsubscribe = dataManager.subscribe((newData) => {
      setData(newData)
    })

    // Start real-time updates
    dataManager.startRealTimeUpdates()

    // Cleanup on unmount
    return unsubscribe
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <h1 className="text-lg font-semibold">SDLC Intelligence Platform</h1>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Overview data={data} />} />
              <Route path="/design" element={<DesignPhase data={data.phases.design} />} />
              <Route path="/code" element={<CodePhase data={data.phases.code} />} />
              <Route path="/build" element={<BuildPhase data={data.phases.build} />} />
              <Route path="/qa" element={<QAPhase data={data.phases.qa} />} />
              <Route path="/deploy" element={<DeployPhase data={data.phases.deploy} />} />
              <Route path="/monitor" element={<MonitorPhase data={data.phases.monitor} />} />
            </Routes>
          </main>

          {/* Footer Navigation */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App