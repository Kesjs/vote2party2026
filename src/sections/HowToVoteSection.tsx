import { Vote, Target, TrendingUp, ShieldCheck, HandCoins, Scale, Users, BarChart2 } from 'lucide-react';
import VoteFormWrapper from '@/components/VoteFormWrapper';

interface HowToVoteSectionProps {
  id?: string;
}

const HowToVoteSection = ({ id }: HowToVoteSectionProps) => {
  const steps = [
    {
      number: 1,
      icon: Vote,
      title: 'Voter, c\'est exister',
      description: 'Ne pas voter, c\'est laisser les autres décider à ta place. Voter, c\'est faire entendre ta voix, ton quartier, ta génération. Même une seule voix compte quand elle s\'additionne à celles des autres.',
      color: 'bg-blue-600',
      iconColor: 'text-white',
      iconBg: 'bg-blue-100'
    },
    {
      number: 2,
      icon: HandCoins,
      title: 'Voter, c\'est arrêter de subir',
      description: 'Tout ce qui te concerne est décidé par des élus. L\'eau, les routes, l\'emploi, la sécurité, les loisirs… Voter, c\'est reprendre une part de pouvoir sur ta vie quotidienne.',
      color: 'bg-green-600',
      iconColor: 'text-white',
      iconBg: 'bg-green-100'
    },
    {
      number: 3,
      icon: BarChart2,
      title: 'Voter, c\'est investir dans l\'avenir',
      description: 'Si les jeunes ne votent pas, on gouverne sans eux. Si les jeunes votent, on est obligé de les écouter. Voter aujourd\'hui, c\'est préparer les opportunités de demain.',
      color: 'bg-purple-600',
      iconColor: 'text-white',
      iconBg: 'bg-purple-100'
    }
  ];

  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            3 bonnes raisons pour voter 
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Parce que l'avenir ne se décide pas sans toi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={step.number} className="group h-full">
                <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 h-full flex flex-col">
                  {/* Number and Connection line */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg`}>
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block flex-1 h-0.5 bg-gray-200 mx-4">
                        <div className={`h-full w-0 group-hover:w-full transition-all duration-500 ${step.color}`}></div>
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`${step.iconBg} p-4 rounded-xl inline-flex`}>
                      <Icon className={`w-8 h-8 ${step.color.replace('bg-', 'text-')}`} strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
      </div>

    </section>
  );
};

export default HowToVoteSection;
