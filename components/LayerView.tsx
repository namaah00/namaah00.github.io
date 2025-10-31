import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Layers, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

interface LayerViewProps {
  selectedTechniques: Set<string>;
}

export function LayerView({ selectedTechniques }: LayerViewProps) {
  const layers = [
    {
      id: 'layer1',
      name: 'Campaign Layer 2024-Q1',
      description: 'Election interference operations identified in Q1 2024',
      techniques: 12,
      coverage: 75,
      severity: 'high',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      id: 'layer2',
      name: 'Social Media Manipulation',
      description: 'Coordinated inauthentic behavior across platforms',
      techniques: 8,
      coverage: 50,
      severity: 'medium',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'layer3',
      name: 'State-Sponsored Activity',
      description: 'Confirmed state-level disinformation campaigns',
      techniques: 15,
      coverage: 94,
      severity: 'critical',
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'layer4',
      name: 'Healthcare Misinformation',
      description: 'Vaccine and health-related disinformation',
      techniques: 6,
      coverage: 38,
      severity: 'medium',
      icon: Layers,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-purple-500';
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-slate-900 mb-2">Layer Analysis</h2>
            <p className="text-slate-600">
              Analyze technique coverage across different campaign layers
            </p>
          </div>
          <Layers className="w-8 h-8 text-slate-400" />
        </div>

        {selectedTechniques.size > 0 && (
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700">
              <span className="text-slate-900">{selectedTechniques.size}</span> techniques selected
              from your current selection
            </p>
          </div>
        )}
      </Card>

      {/* Layers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <Card
              key={layer.id}
              className="p-6 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${layer.bgColor}`}>
                  <Icon className={`w-6 h-6 ${layer.color}`} />
                </div>
                <Badge
                  variant="secondary"
                  className={`${getSeverityColor(layer.severity)} text-white border-0`}
                >
                  {layer.severity.toUpperCase()}
                </Badge>
              </div>

              <h3 className="text-slate-900 mb-2">{layer.name}</h3>
              <p className="text-slate-600 mb-4">{layer.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Techniques</span>
                  <span className="text-slate-900">{layer.techniques}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">Coverage</span>
                    <span className="text-slate-900">{layer.coverage}%</span>
                  </div>
                  <Progress value={layer.coverage} className="h-2" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
                <Badge variant="outline" className="text-slate-600">
                  View Details
                </Badge>
                <Badge variant="outline" className="text-slate-600">
                  Export Layer
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-4">
          <div className="p-3 bg-blue-100 rounded-lg shrink-0">
            <Layers className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-blue-900 mb-2">About Layers</h3>
            <p className="text-blue-800">
              Layers represent different threat actor campaigns or thematic groupings of techniques.
              They help visualize which techniques are commonly used together in real-world operations.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
