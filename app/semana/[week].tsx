import { Stack, useLocalSearchParams } from 'expo-router';
import { WeekCard } from '../../src/components/WeekCard';

export default function WeekDetailScreen() {
  const { week } = useLocalSearchParams<{ week: string }>();
  const weekNum = Math.max(1, Math.min(40, parseInt(week ?? '1', 10)));

  return (
    <>
      <Stack.Screen options={{ title: `Semana ${weekNum}` }} />
      <WeekCard weekNumber={weekNum} />
    </>
  );
}
