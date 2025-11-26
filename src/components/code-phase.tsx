import React from 'react'
import { CodeMetrics } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Code, 
  GitBranch, 
  GitPullRequest, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Activity,
  FileText,
  Zap,
  Clock,
  Download
} from 'lucide-react'
import { formatDate, calculatePercentage, getStatusColor, formatBytes } from '@/lib/utils'

interface CodePhaseProps {
  data: CodeMetrics
}

export function CodePhase({ data }: CodePhaseProps) {
  const codeQuality = data.coverage > 80 ? 'excellent' : data.coverage > 60 ? 'good' : 'needs-improvement'
  const techDebtLevel = data.technicalDebt < 5 ? 'low' : data.technicalDebt < 15 ? 'medium' : 'high'

  const recentCommits = [
    { id: 1, message: 'feat: Add user authentication system', author: 'John Doe', branch: 'feature/auth', timestamp: '2024-01-16 14:30', files: 12 },
    { id: 2, message: 'fix: Resolve memory leak in data processing', author: 'Jane Smith', branch: 'hotfix/memory-leak', timestamp: '2024-01-16 13:15', files: 3 },
    { id: 3, message: 'refactor: Optimize database queries', author: 'Bob Johnson', branch: 'develop', timestamp: '2024-01-16 12:45', files: 8 },
    { id: 4, message: 'docs: Update API documentation', author: 'Alice Brown', branch: 'main', timestamp: '2024-01-16 11:30', files: 5 },
    { id: 5, message: 'test: Add unit tests for user service', author: 'Charlie Wilson', branch: 'feature/tests', timestamp: '2024-01-16 10:15', files: 7 },
  ]

  const pullRequests = [
    { id: 1, title: 'Implement user authentication', author: 'John Doe', status: 'open', reviews: 2, conflicts: 0, timestamp: '2024-01-16 09:00' },
    { id: 2, title: 'Fix security vulnerability', author: 'Jane Smith', status: 'merged', reviews: 3, conflicts: 1, timestamp: '2024-01-15 16:30' },
    { id: 3, title: 'Add performance monitoring', author: 'Bob Johnson', status: 'open', reviews: 1, conflicts: 0, timestamp: '2024-01-15 14:00' },
    { id: 4, title: 'Refactor payment module', author: 'Alice Brown', status: 'under-review', reviews: 2, conflicts: 2, timestamp: '2024-01-15 11:00' },
  ]

  const codeReviews = [
    { id: 1, reviewer: 'John Doe', reviews: 24, avgTime: '2.3h', approval: '96%' },
    { id: 2, reviewer: 'Jane Smith', reviews: 18, avgTime: '1.8h', approval: '94%' },
    { id: 3, reviewer: 'Bob Johnson', reviews: 15, avgTime: '3.1h', approval: '92%' },
    { id: 4, reviewer: 'Alice Brown', reviews: 12, avgTime: '1.5h', approval: '98%' },
  ]

  const getPRStatusIcon = (status: string) => {
    switch (status) {
      case 'merged':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'open':
        return <GitPullRequest className="h-4 w-4 text-blue-600" />
      case 'under-review':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'text-green-600 dark:text-green-400'
      case 'good':
        return 'text-blue-600 dark:text-blue-400'
      case 'needs-improvement':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getTechDebtColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 dark:text-green-400'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'high':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Code Phase</h1>
          <p className="text-muted-foreground mt-2">
            Source code management, development metrics, and code quality
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Code Report
          </Button>
          <Badge variant="outline" className="text-sm">
            Last updated: {formatDate(data.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Lines of Code"
          value={formatBytes(data.linesOfCode)}
          change={8}
          changeLabel="from last week"
          icon={<Code className="h-5 w-5" />}
          description="Total codebase size"
        />
        <MetricCard
          title="Code Coverage"
          value={`${data.coverage}%`}
          change={data.coverage > 80 ? 5 : -3}
          changeLabel="test coverage"
          icon={<CheckCircle className="h-5 w-5" />}
          description="Test coverage percentage"
        />
        <MetricCard
          title="Active Commits"
          value={data.commits}
          change={12}
          changeLabel="this week"
          icon={<GitBranch className="h-5 w-5" />}
          description="Total commits"
        />
        <MetricCard
          title="Technical Debt"
          value={`${data.technicalDebt}d`}
          change={data.technicalDebt < 10 ? -2 : 3}
          changeLabel="debt days"
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Estimated debt time"
        />
      </div>

      {/* Code Quality Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Code Quality Metrics</CardTitle>
            <CardDescription>Overall code health and quality indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Test Coverage</span>
                <span className={getQualityColor(codeQuality)}>{data.coverage}%</span>
              </div>
              <Progress value={data.coverage} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Code Quality</span>
                <span className={getQualityColor(codeQuality)}>{codeQuality}</span>
              </div>
              <Progress value={codeQuality === 'excellent' ? 90 : codeQuality === 'good' ? 70 : 40} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Technical Debt</span>
                <span className={getTechDebtColor(techDebtLevel)}>{techDebtLevel}</span>
              </div>
              <Progress value={techDebtLevel === 'low' ? 20 : techDebtLevel === 'medium' ? 60 : 80} className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data.pullRequests}</div>
                <div className="text-sm text-muted-foreground">Pull Requests</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{data.codeReviews}</div>
                <div className="text-sm text-muted-foreground">Code Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Activity</CardTitle>
            <CardDescription>Team productivity and collaboration metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">87%</div>
                <div className="text-sm text-muted-foreground">PR Merge Rate</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">2.4h</div>
                <div className="text-sm text-muted-foreground">Avg Review Time</div>
              </div>
              <div className="text-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">94%</div>
                <div className="text-sm text-muted-foreground">Code Approval</div>
              </div>
              <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">16</div>
                <div className="text-sm text-muted-foreground">Active Devs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Commits */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Commits</CardTitle>
              <CardDescription>Latest code commits and changes</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <GitBranch className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {recentCommits.map((commit) => (
              <div key={commit.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{commit.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {commit.author} • {commit.branch} • {commit.timestamp} • {commit.files} files
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {commit.branch}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pull Requests & Code Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pull Requests</CardTitle>
            <CardDescription>Active and recent pull requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {pullRequests.map((pr) => (
                <div key={pr.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getPRStatusIcon(pr.status)}
                    <div>
                      <p className="font-medium text-sm">{pr.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {pr.author} • {pr.reviews} reviews • {pr.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {pr.conflicts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {pr.conflicts} conflicts
                      </Badge>
                    )}
                    <Badge variant="outline" className={getStatusColor(pr.status)}>
                      {pr.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Review Performance</CardTitle>
            <CardDescription>Team member review statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {codeReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.reviews} reviews • {review.avgTime} avg time
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {review.approval} approval
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Code Analytics</CardTitle>
          <CardDescription>Detailed code metrics and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-medium">File Count</span>
              </div>
              <p className="text-2xl font-bold">847</p>
              <p className="text-xs text-muted-foreground">Source files</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Complexity</span>
              </div>
              <p className="text-2xl font-bold">6.2</p>
              <p className="text-xs text-muted-foreground">Cyclomatic complexity</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="font-medium">Duplication</span>
              </div>
              <p className="text-2xl font-bold">3.4%</p>
              <p className="text-xs text-muted-foreground">Code duplication</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Churn Rate</span>
              </div>
              <p className="text-2xl font-bold">12%</p>
              <p className="text-xs text-muted-foreground">Monthly churn</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}