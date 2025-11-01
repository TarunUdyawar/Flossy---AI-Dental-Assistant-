import React from 'react';
import { Users, Calendar, UserCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AdminStatsProps {
  totalDoctors: number;
  totalAppointments: number;
  activeDoctors: number;
  activeAppoinments: number;
}

const AdminStats = ({
  totalDoctors,
  totalAppointments,
  activeDoctors,
  activeAppoinments
}: AdminStatsProps) => {
  const stats = [
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Total Doctors',
      value: totalDoctors,
      change: `${activeDoctors} active`,
      positive: true,
      color: 'blue',
      colorClasses: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
      iconColorClasses: 'text-blue-400'
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Total Appointments',
      value: totalAppointments,
      change: `${activeAppoinments} completed`,
      positive: true,
      color: 'orange',
      colorClasses: 'from-orange-500/10 to-orange-600/5 border-orange-500/20',
      iconColorClasses: 'text-orange-400'
    },
    {
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Active Doctors',
      value: activeDoctors,
      change: `${((activeDoctors / totalDoctors) * 100).toFixed(0)}% of total`,
      positive: true,
      color: 'green',
      colorClasses: 'from-green-500/10 to-green-600/5 border-green-500/20',
      iconColorClasses: 'text-green-400'
    },
    {
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Completed Appointments',
      value: activeAppoinments,
      change: `${((activeAppoinments / totalAppointments) * 100).toFixed(0)}% completion rate`,
      positive: true,
      color: 'purple',
      colorClasses: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
      iconColorClasses: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-br ${stat.colorClasses} border rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div
                className={`p-2 sm:p-3 bg-gray-900/50 rounded-lg sm:rounded-xl ${stat.iconColorClasses}`}
              >
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              {stat.title}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-green-400">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;