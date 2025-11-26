export interface ProjectMetrics {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'pending' | 'failed'
  progress: number
  lastUpdated: Date
  team: string[]
}

export interface DesignMetrics {
  requirementsCompleted: number
  requirementsTotal: number
  totalRequirements: number
  mockupsCompleted: number
  mockupsTotal: number
  prototypesCompleted: number
  prototypesTotal: number
  architectureCompleted: number
  architectureTotal: number
  lastUpdated: Date
}

export interface CodeMetrics {
  linesOfCode: number
  commits: number
  pullRequests: number
  codeReviews: number
  technicalDebt: number
  coverage: number
  lastUpdated: Date
}

export interface BuildMetrics {
  buildsTotal: number
  buildsSuccessful: number
  buildsFailed: number
  buildTime: number
  dependencies: number
  securityVulnerabilities: number
  lastUpdated: Date
}

export interface QAMetrics {
  testsTotal: number
  testsPassed: number
  testsFailed: number
  coverage: number
  bugsFound: number
  bugsResolved: number
  performanceScore: number
  lastUpdated: Date
}

export interface DeployMetrics {
  deploymentsTotal: number
  deploymentsSuccessful: number
  deploymentsFailed: number
  uptime: number
  responseTime: number
  errorRate: number
  lastUpdated: Date
}

export interface MonitorMetrics {
  systemHealth: number
  activeUsers: number
  requestsPerMinute: number
  errorRate: number
  cpuUsage: number
  memoryUsage: number
  alerts: number
  lastUpdated: Date
}

export interface KPIData {
  overall: {
    health: number
    progress: number
    efficiency: number
    quality: number
  }
  phases: {
    design: DesignMetrics
    code: CodeMetrics
    build: BuildMetrics
    qa: QAMetrics
    deploy: DeployMetrics
    monitor: MonitorMetrics
  }
}