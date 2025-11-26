import React from 'react'
import { DesignMetrics } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Monitor, 
  Box, 
  GitBranch, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Users,
  Eye,
  Download
} from 'lucide-react'
import { formatDate, calculatePercentage, getStatusColor } from '@/lib/utils'

interface DesignPhaseProps {
  data: DesignMetrics
}

export function DesignPhase({ data }: DesignPhaseProps) {
  const requirementsProgress = calculatePercentage(data.requirementsCompleted, data.requirementsTotal)
  const mockupsProgress = calculatePercentage(data.mockupsCompleted, data.mockupsTotal)
  const prototypesProgress = calculatePercentage(data.prototypesCompleted, data.prototypesTotal)
  const architectureProgress = calculatePercentage(data.architectureCompleted, data.architectureTotal)

  const requirements = [
    { id: 1, title: 'User Authentication System', status: 'completed', priority: 'high', assignee: 'John Doe' },
    { id: 2, title: 'Data Processing Pipeline', status: 'in-progress', priority: 'high', assignee: 'Jane Smith' },
    { id: 3, title: 'API Gateway Configuration', status: 'in-progress', priority: 'medium', assignee: 'Bob Johnson' },
    { id: 4, title: 'Security Framework', status: 'pending', priority: 'high', assignee: 'Alice Brown' },
    { id: 5, title: 'Performance Optimization', status: 'pending', priority: 'medium', assignee: 'Charlie Wilson' },
  ]

  const mockups = [
    { id: 1, title: 'Dashboard Layout', status: 'completed', screens: 12, lastUpdated: '2024-01-15' },
    { id: 2, title: 'User Profile Interface', status: 'completed', screens: 8, lastUpdated: '2024-01-14' },
    { id: 3, title: 'Settings Panel', status: 'in-progress', screens: 6, lastUpdated: '2024-01-16' },
    { id: 4, title: 'Mobile Views', status: 'in-progress', screens: 15, lastUpdated: '2024-01-16' },
  ]

  const architecture = [
    { id: 1, title: 'Microservices Architecture', status: 'completed', components: 8 },
    { id: 2, title: 'Database Schema Design', status: 'completed', components: 12 },
    { id: 3, title: 'API Documentation', status: 'in-progress', components: 25 },
    { id: 4, title: 'Security Architecture', status: 'in-progress', components: 6 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Design & Planning Phase</h1>
          <p className="text-muted-foreground mt-2">
            System architecture, requirements gathering, and UI/UX design
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Design
          </Button>
          <Badge variant="outline" className="text-sm">
            Last updated: {formatDate(data.lastUpdated)}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Requirements"
          value={`${data.requirementsCompleted}/${data.requirementsTotal}`}
          change={12}
          changeLabel="completed this week"
          icon={<FileText className="h-5 w-5" />}
          description="Functional and non-functional requirements"
        />
        <MetricCard
          title="Mockups & Wireframes"
          value={`${data.mockupsCompleted}/${data.mockupsTotal}`}
          change={8}
          changeLabel="new designs"
          icon={<Monitor className="h-5 w-5" />}
          description="UI/UX design assets"
        />
        <MetricCard
          title="Prototypes"
          value={`${data.prototypesCompleted}/${data.prototypesTotal}`}
          change={3}
          changeLabel="interactive prototypes"
          icon={<Box className="h-5 w-5" />}
          description="Interactive design prototypes"
        />
        <MetricCard
          title="Architecture"
          value={`${data.architectureCompleted}/${data.architectureTotal}`}
          change={5}
          changeLabel="components designed"
          icon={<GitBranch className="h-5 w-5" />}
          description="System architecture documentation"
        />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Design Progress</CardTitle>
            <CardDescription>Overall completion status across design categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Requirements</span>
                <span className="text-muted-foreground">{requirementsProgress}%</span>
              </div>
              <Progress value={requirementsProgress} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Mockups & Wireframes</span>
                <span className="text-muted-foreground">{mockupsProgress}%</span>
              </div>
              <Progress value={mockupsProgress} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Prototypes</span>
                <span className="text-muted-foreground">{prototypesProgress}%</span>
              </div>
              <Progress value={prototypesProgress} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Architecture</span>
                <span className="text-muted-foreground">{architectureProgress}%</span>
              </div>
              <Progress value={architectureProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design Team Performance</CardTitle>
            <CardDescription>Team velocity and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-sm text-muted-foreground">On-Time Delivery</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <div className="text-sm text-muted-foreground">Stakeholder Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-muted-foreground">Design Iterations</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <div className="text-sm text-muted-foreground">Avg. Design Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requirements Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Requirements Management</CardTitle>
              <CardDescription>Track functional and non-functional requirements</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {requirements.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(req.status)}
                  <div>
                    <p className="font-medium text-sm">{req.title}</p>
                    <p className="text-xs text-muted-foreground">Assigned to {req.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={req.priority === 'high' ? 'destructive' : 'secondary'}>
                    {req.priority}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(req.status)}>
                    {req.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mockups & Prototypes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mockups & Wireframes</CardTitle>
            <CardDescription>UI/UX design assets and screens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {mockups.map((mockup) => (
                <div key={mockup.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(mockup.status)}
                    <div>
                      <p className="font-medium text-sm">{mockup.title}</p>
                      <p className="text-xs text-muted-foreground">{mockup.screens} screens • Updated {mockup.lastUpdated}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(mockup.status)}>
                    {mockup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Architecture</CardTitle>
            <CardDescription>Technical architecture and system design</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
              {architecture.map((arch) => (
                <div key={arch.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(arch.status)}
                    <div>
                      <p className="font-medium text-sm">{arch.title}</p>
                      <p className="text-xs text-muted-foreground">{arch.components} components</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(arch.status)}>
                    {arch.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Design Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Design Resources & Documentation</CardTitle>
          <CardDescription>Quick access to design assets and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Requirements Doc</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Monitor className="h-6 w-6 mb-2" />
              <span className="text-sm">UI Style Guide</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <GitBranch className="h-6 w-6 mb-2" />
              <span className="text-sm">Architecture Diagrams</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">User Personas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}