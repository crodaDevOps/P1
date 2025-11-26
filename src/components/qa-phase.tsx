import React from 'react'
import { QAMetrics } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Bug, 
  TrendingUp,
  Activity,
  Shield,
  Zap,
  Clock,
  Download,
  FileText,
  Target
} from 'lucide-react'
import { formatDate, calculatePercentage, getStatusColor } from '@/lib/utils'

interface QAPhaseProps {
  data: QAMetrics
}

export function QAPhase({ data }: QAPhaseProps) {
  const testPassRate = calculatePercentage(data.testsPassed, data.testsTotal)
  const testFailRate = calculatePercentage(data.testsFailed, data.testsTotal)
  const bugResolutionRate = data.bugsFound > 0 ? calculatePercentage(data.bugsResolved, data.bugsFound) : 100
  const openBugs = data.bugsFound - data.bugsResolved

  const testSuites = [
    { id: 1, name: 'Unit Tests', total: 245, passed: 240, failed: 5, duration: '2m 15s', lastRun: '2024-01-16 14:30' },
    { id: 2, name: 'Integration Tests', total: 89, passed: 85, failed: 4, duration: '5m 42s', lastRun: '2024-01-16 13:15' },
    { id: 3, name: 'E2E Tests', total: 34, passed: 32, failed: 2, duration: '12m 18s', lastRun: '2024-01-16 12:45' },
    { id: 4, name: 'Performance Tests', total: 18, passed: 17, failed: 1, duration: '8m 30s', lastRun: '2024-01-16 11:30' },
    { id: 5, name: 'Security Tests', total: 22, passed: 20, failed: 2, duration: '4m 55s', lastRun: '2024-01-16 10:15' },
  ]

  const bugReports = [
    { id: 1, title: 'Login page crashes on mobile devices', severity: 'critical', status: 'open', assignee: 'John Doe', reportedBy: 'Jane Smith', date: '2024-01-16' },
    { id: 2, title: 'Data export fails for large datasets', severity: 'high', status: 'in-progress', assignee: 'Bob Johnson', reportedBy: 'Alice Brown', date: '2024-01-15' },
    { id: 3, title: 'UI glitch in dark mode', severity: 'medium', status: 'resolved', assignee: 'Charlie Wilson', reportedBy: 'David Lee', date: '2024-01-14' },
    { id: 4, title: 'Slow loading times on dashboard', severity: 'medium', status: 'resolved', assignee: 'Eve Davis', reportedBy: 'Frank Miller', date: '2024-01-13' },
    { id: 5, title: 'Missing validation in form fields', severity: 'low', status: 'open', assignee: 'Grace Taylor', reportedBy: 'Henry Wilson', date: '2024-01-12' },
  ]

  const performanceMetrics = [
    { name: 'Page Load Time', value: '1.2s', target: '2s', status: 'good' },
    { name: 'Time to Interactive', value: '2.8s', target: '3s', status: 'good' },
    { name: 'First Contentful Paint', value: '0.8s', target: '1.5s', status: 'excellent' },
    { name: 'Largest Contentful Paint', value: '2.1s', target: '2.5s', status: 'good' },
    { name: 'Cumulative Layout Shift', value: '0.05', target: '0.1', status: 'excellent' },
    { name: 'Total Blocking Time', value: '120ms', target: '200ms', status: 'good' },
  ]

  const getTestStatusIcon = (passed: number, total: number) => {
    const passRate = calculatePercentage(passed, total)
    if (passRate >= 95) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (passRate >= 80) return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
      case 'high':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
      case 'low':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getPerformanceStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 dark:text-green-400'
      case 'good':
        return 'text-blue-600 dark:text-blue-400'
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'poor':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quality Assurance Phase</h1>
          <p className="text-muted-foreground mt-2">
            Testing, quality control, and performance optimization
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Test Report
          </Button>
          <Badge variant="outline" className="text-sm">
            Last updated: {formatDate(data.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Test Coverage"
          value={`${data.coverage}%`}
          change={data.coverage > 80 ? 8 : -5}
          changeLabel="from last week"
          icon={<Target className="h-5 w-5" />}
          description="Code coverage percentage"
        />
        <MetricCard
          title="Test Pass Rate"
          value={`${testPassRate}%`}
          change={testPassRate > 90 ? 3 : -2}
          changeLabel="pass rate"
          icon={<CheckCircle className="h-5 w-5" />}
          description="Tests passing successfully"
        />
        <MetricCard
          title="Open Bugs"
          value={openBugs}
          change={openBugs < 10 ? -4 : 2}
          changeLabel="bugs to resolve"
          icon={<Bug className="h-5 w-5" />}
          description="Active bug reports"
        />
        <MetricCard
          title="Performance Score"
          value={data.performanceScore}
          change={data.performanceScore > 85 ? 6 : -3}
          changeLabel="performance score"
          icon={<Zap className="h-5 w-5" />}
          description="Overall performance rating"
        />
      </div>

      {/* Test Results Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Results Summary</CardTitle>
            <CardDescription>Overall test execution results and coverage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Test Pass Rate</span>
                <span className="text-green-600">{testPassRate}%</span>
              </div>
              <Progress value={testPassRate} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Test Fail Rate</span>
                <span className="text-red-600">{testFailRate}%</span>
              </div>
              <Progress value={testFailRate} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Code Coverage</span>
                <span className="text-blue-600">{data.coverage}%</span>
              </div>
              <Progress value={data.coverage} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data.testsPassed}</div>
                <div className="text-sm text-muted-foreground">Tests Passed</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{data.testsFailed}</div>
                <div className="text-sm text-muted-foreground">Tests Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bug Resolution Metrics</CardTitle>
            <CardDescription>Bug tracking and resolution statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{data.bugsFound}</div>
                <div className="text-sm text-muted-foreground">Total Bugs</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data.bugsResolved}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{openBugs}</div>
                <div className="text-sm text-muted-foreground">Open</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{bugResolutionRate}%</div>
                <div className="text-sm text-muted-foreground">Resolution Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Suites */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Test Suites</CardTitle>
              <CardDescription>Detailed test suite execution results</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Run All Tests
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {testSuites.map((suite) => (
              <div key={suite.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getTestStatusIcon(suite.passed, suite.total)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{suite.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {suite.passed}/{suite.total} passed • {suite.duration} • {suite.lastRun}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {calculatePercentage(suite.passed, suite.total)}% pass
                  </Badge>
                  {suite.failed > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {suite.failed} failed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bug Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Bug Reports</CardTitle>
              <CardDescription>Latest bug reports and their status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Bug className="h-4 w-4 mr-2" />
              View All Bugs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {bugReports.map((bug) => (
              <div key={bug.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bug className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{bug.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {bug.reportedBy} → {bug.assignee} • {bug.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getSeverityColor(bug.severity)}>
                    {bug.severity}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(bug.status)}>
                    {bug.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Application performance and optimization metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{metric.name}</span>
                  <span className={`text-sm font-medium ${getPerformanceStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{metric.value}</span>
                  <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QA Resources */}
      <Card>
        <CardHeader>
          <CardTitle>QA Resources & Documentation</CardTitle>
          <CardDescription>Quick access to testing resources and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Test Plans</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-sm">Security Tests</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Zap className="h-6 w-6 mb-2" />
              <span className="text-sm">Performance Tests</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Bug className="h-6 w-6 mb-2" />
              <span className="text-sm">Bug Tracking</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}