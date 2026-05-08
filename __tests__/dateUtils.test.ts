import {
  calcDPPFromLMP,
  calcDPPFromConception,
  calcGestationMetrics,
} from '../src/utils/dateUtils';

const MS_PER_DAY = 86_400_000;

function isoFromOffset(daysFromToday: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setTime(d.getTime() + daysFromToday * MS_PER_DAY);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

describe('calcDPPFromLMP', () => {
  test('1. LMP 2026-01-30 + 280 dias = 2026-11-06', () => {
    expect(calcDPPFromLMP('2026-01-30')).toBe('2026-11-06');
  });

  test('3. lança Error com "Invalid date" para input inválido', () => {
    expect(() => calcDPPFromLMP('xyz')).toThrow(/Invalid date/);
    expect(() => calcDPPFromLMP('2026-13-01')).toThrow(/Invalid date/);
    expect(() => calcDPPFromLMP('')).toThrow(/Invalid date/);
  });
});

describe('calcDPPFromConception', () => {
  test('2. Concepção 2026-02-13 + 266 dias = 2026-11-06', () => {
    expect(calcDPPFromConception('2026-02-13')).toBe('2026-11-06');
  });
});

describe('calcGestationMetrics', () => {
  test('4. DPP = hoje → weeksElapsed=40, daysElapsed=280, weeksRemaining=0, daysRemaining=0', () => {
    const m = calcGestationMetrics(isoFromOffset(0));
    expect(m.weeksElapsed).toBe(40);
    expect(m.daysElapsed).toBe(280);
    expect(m.weeksRemaining).toBe(0);
    expect(m.daysRemaining).toBe(0);
  });

  test('5. DPP = hoje+140d (semana 20) → weeksElapsed=20, daysElapsed=140, weeksRemaining=20, daysRemaining=140', () => {
    const m = calcGestationMetrics(isoFromOffset(140));
    expect(m.daysElapsed).toBe(140);
    expect(m.weeksElapsed).toBe(20);
    expect(m.daysRemaining).toBe(140);
    expect(m.weeksRemaining).toBe(20);
  });

  test('6. DPP no passado (hoje-30d) → clamp em 280/40/0/0 (sem negativos)', () => {
    const m = calcGestationMetrics(isoFromOffset(-30));
    expect(m.daysElapsed).toBe(280);
    expect(m.weeksElapsed).toBe(40);
    expect(m.daysRemaining).toBe(0);
    expect(m.weeksRemaining).toBe(0);
  });

  test('7. LMP no futuro (DPP=hoje+300d) → clamp em 0/0/280/40 (sem negativos)', () => {
    const m = calcGestationMetrics(isoFromOffset(300));
    expect(m.daysElapsed).toBe(0);
    expect(m.weeksElapsed).toBe(0);
    expect(m.daysRemaining).toBe(280);
    expect(m.weeksRemaining).toBe(40);
  });

  test('8. dppFormatted contém "outubro" para DPP em 2026-10-04 (locale pt-BR)', () => {
    const m = calcGestationMetrics('2026-10-04');
    expect(m.dppFormatted).toMatch(/outubro/);
    expect(m.dppFormatted).toMatch(/2026/);
    expect(m.dppFormatted).toMatch(/4/);
  });

  test('9a. Boundary semana: dia 111 → weeksElapsed=15 (Math.floor)', () => {
    // dia 111 elapsed = DPP daqui a (280-111)=169 dias
    const m = calcGestationMetrics(isoFromOffset(169));
    expect(m.daysElapsed).toBe(111);
    expect(m.weeksElapsed).toBe(15);
  });

  test('9b. Boundary semana: dia 112 → weeksElapsed=16 (Math.floor)', () => {
    const m = calcGestationMetrics(isoFromOffset(168));
    expect(m.daysElapsed).toBe(112);
    expect(m.weeksElapsed).toBe(16);
  });
});
