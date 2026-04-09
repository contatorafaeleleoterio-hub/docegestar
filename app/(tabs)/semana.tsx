import { View, ActivityIndicator } from 'react-native';
import { WeekCard } from '../../src/components/WeekCard';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';

export default function SemanaScreen() {
  const currentWeek = useCurrentWeek();
  if (currentWeek === null) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;
  return <WeekCard weekNumber={currentWeek} />;
}
