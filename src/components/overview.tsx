import React from 'react'
import { KPIData } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  GitBranch,
  Bug,
  Rocket
} from 'lucide-react'
import { getStatusColor, formatDate, calculatePercentage } from '@/lib/utils'

interface OverviewProps {
  data: KPIData
}

export function Overview({ data }: OverviewProps) {
  const { overall, phases } = data

  const phaseMetrics = [
    {
      name: 'Design',
      icon: <Palette className="h-5 w-5" />,
      progress: calculatePercentage(phases.design.requirementsCompleted, phases.design.requirementsTotal),
      status: phases.design.requirementsCompleted === phases.design.requirementsTotal ? 'completed' : 'in-progress',
      metrics: {
        completed: phases.design.requirementsCompleted,
        total: phases.design.requirementsTotal,
        efficiency: Math.round((phases.design.requirementsCompleted / phases.design.requirementsTotal) * 100)
      }
    },
    {
      name: 'Code',
      icon: <Code className="h-5 w-5" />,
      progress: Math.min(phases.code.coverage, 100),
      status: phases.code.coverage > 80 ? 'completed' : phases.code.coverage > 50 ? 'in-progress' : 'pending',
      metrics: {
        coverage: phases.code.coverage,
        commits: phases.code.commits,
        technicalDebt: phases.code.technicalDebt
      }
    },
    {
      name: 'Build',
      icon: <Hammer className="h-5 w-5" />,
      progress: calculatePercentage(phases.build.buildsSuccessful, phases.build.buildsTotal),
      status: phases.build.buildsFailed === 0 ? 'completed' : 'in-progress',
      metrics: {
        success: phases.build.buildsSuccessful,
        total: phases.build.buildsTotal,
        vulnerabilities: phases.build.securityVulnerabilities
      }
    },
    {
      name: 'QA',
      icon: <CheckCircle className="h-5 w-5" />,
      progress: calculatePercentage(phases.qa.testsPassed, phases.qa.testsTotal),
      status: phases.qa.performanceScore > 90 ? 'completed' : 'in-progress',
      metrics: {
        passed: phases.qa.testsPassed,
        total: phases.qa.testsTotal,
        bugs: phases.qa.bugsFound - phases.qa.bugsResolved
      }
    },
    {
      name: 'Deploy',
      icon: <Rocket className="h-5 w-5" />,
      progress: calculatePercentage(phases.deploy.deploymentsSuccessful, phases.deploy.deploymentsTotal),
      status: phases.deploy.errorRate < 1 ? 'completed' : 'in-progress',
      metrics: {
        success: phases.deploy.deploymentsSuccessful,
        total: phases.deploy.deploymentsTotal,
        uptime: phases.deploy.uptime
      }
    },
    {
      name: 'Monitor',
      icon: <Activity className="h-5 w-5" />,
      progress: phases.monitor.systemHealth,
      status: phases.monitor.systemHealth > 95 ? 'completed' : phases.monitor.systemHealth > 80 ? 'in-progress' : 'pending',
      metrics: {
        health: phases.monitor.systemHealth,
        users: phases.monitor.activeUsers,
        alerts: phases.monitor.alerts
      }
    }
  ]

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SDLC Intelligence Platform</h1>
          <p className="text-muted-foreground mt-2">
            Real-time overview of your software development lifecycle
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Last updated: {formatDate(new Date())}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Health"
          value={`${overall.health}%`}
          change={overall.health > 80 ? 5 : -3}
          changeLabel="from last week"
          icon={<Activity className="h-5 w-5" />}
          description="System-wide health score"
        />
        <MetricCard
          title="Project Progress"
          value={`${overall.progress}%`}
          change={2}
          changeLabel="this sprint"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Overall completion rate"
        />
        <MetricCard
          title="Team Efficiency"
          value={`${overall.efficiency}%`}
          change={-1}
          changeLabel="from baseline"
          icon={<Users className="h-5 w-5" />}
          description="Development velocity"
        />
        <MetricCard
          title="Quality Score"
          value={`${overall.quality}%`}
          change={8}
          changeLabel="improvement"
          icon={<CheckCircle className="h-5 w-5" />}
          description="Code and testing quality"
        />
      </div>

      {/* Phase Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {phaseMetrics.map((phase) => (
          <Card key={phase.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {phase.icon}
                  <CardTitle className="text-lg">{phase.name}</CardTitle>
                </div>
                <Badge 
                  variant={phase.status === 'completed' ? 'default' : 'secondary'}
                  className={getStatusColor(phase.status)}
                >
                  {phase.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  {phase.name === 'Design' && (
                    <>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.completed}</div>
                        <div className="text-xs text-muted-foreground">Requirements</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                    </>
                  )}
                  {phase.name === 'Code' && (
                    <>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.coverage}%</div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.commits}</div>
                        <div className="text-xs text-muted-foreground">Commits</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.technicalDebt}</div>
                        <div className="text-xs text-muted-foreground">Tech Debt</div>
                      </div>
                    </>
                  )}
                  {phase.name === 'Build' && (
                    <>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.success}</div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.vulnerabilities}</div>
                        <div className="text-xs text-muted-foreground">Vulnerabilities</div>
                      </div>
                    </>
                  )}
                  {phase.name === 'QA' && (
                    <>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.passed}</div>
                        <div className="text-xs text-muted-foreground">Passed</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.bugs}</div>
                        <div className="text-xs text-muted-foreground">Open Bugs</div>
                      </div>
                    </>
                  )}
                  {phase.name === 'Deploy' && (
                    <>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.success}</div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.uptime}%</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </div>
                    </>
                  )}
                  {phase.name === 'Monitor' && (
                    <>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.health}%</div>
                        <div className="text-xs text-muted-foreground">Health</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.users}</div>
                        <div className="text-xs text-muted-foreground">Users</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-lg font-bold">{phase.metrics.alerts}</div>
                        <div className="text-xs text-muted-foreground">Alerts</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across all phases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Design phase requirements completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Build failed due to security vulnerability</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Code coverage improved to 85%</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Rocket className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Deployment to production completed</p>
                <p className="text-xs text-muted-foreground">8 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Import Palette icon
import { Palette } from 'lucide-react'