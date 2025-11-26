import { KPIData, DesignMetrics, CodeMetrics, BuildMetrics, QAMetrics, DeployMetrics, MonitorMetrics } from '@/types'

class DataManager {
  private static instance: DataManager
  private data: KPIData
  private subscribers: Array<(data: KPIData) => void> = []

  private constructor() {
    this.data = this.initializeMockData()
  }

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  private initializeMockData(): KPIData {
    return {
      overall: {
        health: 92,
        progress: 78,
        efficiency: 85,
        quality: 88
      },
      phases: {
        design: {
          requirementsCompleted: 45,
          requirementsTotal: 50,
          totalRequirements: 50,
          mockupsCompleted: 28,
          mockupsTotal: 30,
          prototypesCompleted: 8,
          prototypesTotal: 10,
          architectureCompleted: 12,
          architectureTotal: 15,
          lastUpdated: new Date('2024-01-16T14:30:00Z')
        },
        code: {
          linesOfCode: 250000,
          commits: 342,
          pullRequests: 28,
          codeReviews: 67,
          technicalDebt: 8,
          coverage: 85,
          lastUpdated: new Date('2024-01-16T14:30:00Z')
        },
        build: {
          buildsTotal: 156,
          buildsSuccessful: 142,
          buildsFailed: 14,
          buildTime: 4.5,
          dependencies: 48,
          securityVulnerabilities: 3,
          lastUpdated: new Date('2024-01-16T14:30:00Z')
        },
        qa: {
          testsTotal: 408,
          testsPassed: 394,
          testsFailed: 14,
          coverage: 85,
          bugsFound: 67,
          bugsResolved: 52,
          performanceScore: 88,
          lastUpdated: new Date('2024-01-16T14:30:00Z')
        },
        deploy: {
          deploymentsTotal: 48,
          deploymentsSuccessful: 45,
          deploymentsFailed: 3,
          uptime: 99.7,
          responseTime: 145,
          errorRate: 0.8,
          lastUpdated: new Date('2024-01-16T14:30:00Z')
        },
        monitor: {
          systemHealth: 94,
          activeUsers: 1250,
          requestsPerMinute: 2450,
          errorRate: 0.8,
          cpuUsage: 68,
          memoryUsage: 72,
          alerts: 5,
          lastUpdated: new Date('2024-01-16T14:30:00Z')
        }
      }
    }
  }

  getData(): KPIData {
    return this.data
  }

  updateDesignPhase(updates: Partial<DesignMetrics>): void {
    this.data.phases.design = { ...this.data.phases.design, ...updates, lastUpdated: new Date() }
    this.recalculateOverallMetrics()
    this.notifySubscribers()
  }

  updateCodePhase(updates: Partial<CodeMetrics>): void {
    this.data.phases.code = { ...this.data.phases.code, ...updates, lastUpdated: new Date() }
    this.recalculateOverallMetrics()
    this.notifySubscribers()
  }

  updateBuildPhase(updates: Partial<BuildMetrics>): void {
    this.data.phases.build = { ...this.data.phases.build, ...updates, lastUpdated: new Date() }
    this.recalculateOverallMetrics()
    this.notifySubscribers()
  }

  updateQAPhase(updates: Partial<QAMetrics>): void {
    this.data.phases.qa = { ...this.data.phases.qa, ...updates, lastUpdated: new Date() }
    this.recalculateOverallMetrics()
    this.notifySubscribers()
  }

  updateDeployPhase(updates: Partial<DeployMetrics>): void {
    this.data.phases.deploy = { ...this.data.phases.deploy, ...updates, lastUpdated: new Date() }
    this.recalculateOverallMetrics()
    this.notifySubscribers()
  }

  updateMonitorPhase(updates: Partial<MonitorMetrics>): void {
    this.data.phases.monitor = { ...this.data.phases.monitor, ...updates, lastUpdated: new Date() }
    this.recalculateOverallMetrics()
    this.notifySubscribers()
  }

  private recalculateOverallMetrics(): void {
    const { design, code, build, qa, deploy, monitor } = this.data.phases
    
    // Calculate overall health
    const designProgress = (design.requirementsCompleted / design.requirementsTotal) * 100
    const codeQuality = code.coverage
    const buildSuccess = (build.buildsSuccessful / build.buildsTotal) * 100
    const qaPassRate = (qa.testsPassed / qa.testsTotal) * 100
    const deploySuccess = (deploy.deploymentsSuccessful / deploy.deploymentsTotal) * 100
    const monitorHealth = monitor.systemHealth
    
    this.data.overall.health = Math.round((designProgress + codeQuality + buildSuccess + qaPassRate + deploySuccess + monitorHealth) / 6)
    
    // Calculate overall progress
    this.data.overall.progress = Math.round((designProgress + codeQuality + qaPassRate + deploySuccess) / 4)
    
    // Calculate efficiency (based on build time, technical debt, and deployment success)
    const buildEfficiency = Math.max(0, 100 - (build.buildTime * 10))
    const codeEfficiency = Math.max(0, 100 - (code.technicalDebt * 5))
    const deployEfficiency = deploySuccess
    
    this.data.overall.efficiency = Math.round((buildEfficiency + codeEfficiency + deployEfficiency) / 3)
    
    // Calculate quality (based on test coverage, bug resolution, and system health)
    const testQuality = qa.coverage
    const bugQuality = qa.bugsFound > 0 ? (qa.bugsResolved / qa.bugsFound) * 100 : 100
    const performanceQuality = qa.performanceScore
    
    this.data.overall.quality = Math.round((testQuality + bugQuality + performanceQuality) / 3)
  }

  subscribe(callback: (data: KPIData) => void): () => void {
    this.subscribers.push(callback)
    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.data))
  }

  // Simulate real-time data updates
  startRealTimeUpdates(): void {
    setInterval(() => {
      // Simulate random fluctuations in monitoring data
      const monitorUpdates = {
        activeUsers: Math.max(1000, this.data.phases.monitor.activeUsers + Math.floor(Math.random() * 100 - 50)),
        requestsPerMinute: Math.max(2000, this.data.phases.monitor.requestsPerMinute + Math.floor(Math.random() * 200 - 100)),
        cpuUsage: Math.max(30, Math.min(90, this.data.phases.monitor.cpuUsage + Math.random() * 10 - 5)),
        memoryUsage: Math.max(40, Math.min(85, this.data.phases.monitor.memoryUsage + Math.random() * 8 - 4)),
        systemHealth: Math.max(80, Math.min(100, this.data.phases.monitor.systemHealth + Math.random() * 6 - 3)),
        lastUpdated: new Date()
      }
      
      this.updateMonitorPhase(monitorUpdates)
    }, 5000) // Update every 5 seconds
  }
}

export default DataManager