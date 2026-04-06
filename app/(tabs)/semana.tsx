import { WeekCard } from '../../src/components/WeekCard';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';

export default function SemanaScreen() {
  const currentWeek = useCurrentWeek();
  return <WeekCard weekNumber={currentWeek} />;
}
