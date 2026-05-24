import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, shadows } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { useSymptomReport, buildReportText } from '../src/hooks/useSymptomReport';
import { INTENSITY_COLOR_KEY, INTENSITY_LABEL } from '../src/hooks/useSymptomLogs';
import { DGIcon } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';
import * as Print from 'expo-print';

export default function SymptomReportScreen() {
  const router = useRouter();
  const week = useCurrentWeek();
  const bottom = useBottomSpacing(false);
  const { data, loading } = useSymptomReport(week ?? 1);

  const ready = week !== null && !loading && data !== null;
  const hasData = ready && data!.symptoms.length > 0;

  function onShare() {
    if (!data) return;
    Share.share({ message: buildReportText(data) }).catch(() => {});
  }

  async function onExportPDF() {
    if (!data) return;

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              padding: 24px;
              color: #1F1A2E;
              line-height: 1.6;
              background-color: #FBF7FA;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: #ffffff;
              padding: 32px;
              border-radius: 16px;
              box-shadow: 0 4px 12px rgba(31, 26, 46, 0.05);
            }
            h1 {
              color: #EC3779;
              font-size: 24px;
              margin-bottom: 8px;
              font-weight: 700;
            }
            .subtitle {
              color: #5E5870;
              font-size: 14px;
              margin-bottom: 24px;
              border-bottom: 2px solid #EDE7F3;
              padding-bottom: 12px;
            }
            .section {
              margin-bottom: 24px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #1F1A2E;
              margin-bottom: 12px;
              border-bottom: 1px solid #EDE7F3;
              padding-bottom: 6px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 8px;
            }
            th, td {
              text-align: left;
              padding: 12px 10px;
              border-bottom: 1px solid #EDE7F3;
            }
            th {
              background-color: #F4F0FB;
              font-size: 11px;
              text-transform: uppercase;
              color: #5E5870;
              letter-spacing: 0.5px;
            }
            td {
              font-size: 14px;
            }
            .badge {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: bold;
              text-transform: capitalize;
            }
            .badge-leve { background-color: #FFF1F5; color: #C8255F; }
            .badge-media { background-color: #EC5C93; color: #FFFFFF; }
            .badge-forte { background-color: #C8255F; color: #FFFFFF; }
            .alert-box {
              background-color: #FFF2F2;
              border-left: 4px solid #E15858;
              padding: 16px;
              border-radius: 8px;
              margin-bottom: 24px;
            }
            .alert-title {
              color: #E15858;
              font-weight: bold;
              margin-bottom: 8px;
              font-size: 14px;
            }
            .alert-list {
              margin: 0;
              padding-left: 20px;
              color: #1F1A2E;
              font-size: 13px;
            }
            .alert-list li {
              margin-bottom: 6px;
            }
            .note-item {
              font-style: italic;
              margin-bottom: 10px;
              padding: 10px 12px;
              background-color: #F4F0FB;
              border-radius: 8px;
              color: #5E5870;
              font-size: 13px;
            }
            .trend-text {
              font-size: 14px;
              color: #5E5870;
              background-color: #F4F0FB;
              padding: 12px;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>DoceGestar — Relatório de Sintomas</h1>
            <div class="subtitle">
              Semana gestacional: ${data.toWeek} | Período: semanas ${data.fromWeek} a ${data.toWeek} | Dias com registro: ${data.totalDaysLogged}
            </div>

            ${data.warningAlerts.length > 0 ? `
              <div class="alert-box">
                <div class="alert-title">⚠️ Sinais de Alerta Identificados</div>
                <ul class="alert-list">
                  ${data.warningAlerts.map(a => `<li>${a}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <div class="section">
              <div class="section-title">Sintomas no Período</div>
              <table>
                <thead>
                  <tr>
                    <th>Sintoma</th>
                    <th>Frequência</th>
                    <th>Intensidade Máxima</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.symptoms.map(s => `
                    <tr>
                      <td><strong>${s.symptom}</strong></td>
                      <td>${s.days} dia(s)</td>
                      <td><span class="badge badge-${s.maxIntensity}">${s.maxIntensity}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            ${data.trend ? `
              <div class="section">
                <div class="section-title">Tendência dos Sintomas</div>
                <div class="trend-text">
                  Os sintomas apresentados <strong>${data.trend === 'piorando' ? 'aumentaram' : data.trend === 'melhorando' ? 'diminuíram' : 'permaneceram estáveis'}</strong> em relação à semana anterior.
                </div>
              </div>
            ` : ''}

            ${data.notes.length > 0 ? `
              <div class="section">
                <div class="section-title">Anotações da Gestante</div>
                ${data.notes.map(n => `
                  <div class="note-item">
                    <strong>Semana ${n.week}:</strong> "${n.note}"
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <p style="font-size: 11px; color: #8A7FA0; text-align: center; margin-top: 40px; border-top: 1px solid #EDE7F3; padding-top: 12px;">
              Gerado automaticamente pelo aplicativo DoceGestar em ${new Date().toLocaleDateString('pt-BR')}.
            </p>
          </div>
        </body>
      </html>
    `;

    try {
      await Print.printAsync({ html });
    } catch (e) {
      console.log('Erro ao imprimir PDF:', e);
    }
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <DGIcon name="chevronLeft" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Relatório</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Resumo para a consulta</Text>
          {ready && (
            <Text style={styles.heroSub}>
              Semana {data!.toWeek} · semanas {data!.fromWeek}–{data!.toWeek} · {data!.totalDaysLogged} dia(s) registrado(s)
            </Text>
          )}
        </View>

        {!ready ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : !hasData ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTxt}>
              Ainda não há sintomas registrados nas últimas semanas. Registre no dia a dia
              para gerar um resumo para o seu médico.
            </Text>
          </View>
        ) : (
          <>
            {data!.warningAlerts && data!.warningAlerts.length > 0 && (
              <View style={styles.warningAlertCard}>
                <View style={styles.warningAlertTitleContainer}>
                  <DGIcon name="alert" size={18} color="#E15858" />
                  <Text style={styles.warningAlertTitle}>Sinais de Alerta</Text>
                </View>
                {data!.warningAlerts.map((w, idx) => (
                  <View key={`alert-${idx}`} style={styles.warningAlertItem}>
                    <Text style={styles.warningAlertBullet}>•</Text>
                    <Text style={styles.warningAlertTxt}>{w}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Sintomas no período</Text>
              {data!.symptoms.map((s) => (
                <View key={s.symptom} style={styles.row}>
                  <Text style={styles.rowName}>{s.symptom}</Text>
                  <View style={styles.rowRight}>
                    <Text style={styles.rowDays}>{s.days} dia(s)</Text>
                    <View style={[styles.badge, { backgroundColor: colors[INTENSITY_COLOR_KEY[s.maxIntensity]] }]}>
                      <Text
                        style={[
                          styles.badgeTxt,
                          { color: s.maxIntensity === 'leve' ? colors.primaryDeep : '#FFFFFF' },
                        ]}
                      >
                        {INTENSITY_LABEL[s.maxIntensity]}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {data!.trend && (
              <View style={styles.trendCard}>
                <DGIcon name="activity" size={18} color={colors.primary} />
                <Text style={styles.trendTxt}>
                  {data!.trend === 'piorando' && 'Os sintomas aumentaram em relação à semana anterior.'}
                  {data!.trend === 'melhorando' && 'Os sintomas diminuíram em relação à semana anterior.'}
                  {data!.trend === 'estavel' && 'Os sintomas ficaram estáveis em relação à semana anterior.'}
                </Text>
              </View>
            )}

            {data!.notes.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Anotações</Text>
                {data!.notes.map((n, i) => (
                  <Text key={`${n.date}-${i}`} style={styles.note}>
                    Semana {n.week}: “{n.note}”
                  </Text>
                ))}
              </View>
            )}
          </>
        )}

        {hasData && (
          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, styles.pdfBtn]} onPress={onExportPDF}>
              <DGIcon name="fileText" size={20} color={colors.primary} />
              <Text style={styles.pdfTxt}>Exportar PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.shareBtn]} onPress={onShare}>
              <DGIcon name="share" size={20} color={colors.onPrimary} />
              <Text style={styles.shareTxt}>Compartilhar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    ...shadows.soft,
  },
  headerTitle: { ...typography.h3, color: colors.text },
  content: { padding: 20, gap: 16 },
  hero: { marginBottom: 4 },
  heroTitle: { ...typography.h1, color: colors.text },
  heroSub: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 4 },

  card: { backgroundColor: colors.surface, borderRadius: 24, padding: 20, ...shadows.soft },
  sectionTitle: { ...typography.label, color: colors.text, marginBottom: 12 },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.divider,
  },
  rowName: { ...typography.body, color: colors.text, flex: 1, marginRight: 12 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowDays: { ...typography.caption, color: colors.textSecondary },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeTxt: { ...typography.caption, fontWeight: '700' },

  trendCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.lav50, borderRadius: 16, padding: 16,
  },
  trendTxt: { ...typography.bodySmall, color: colors.textSecondary, flex: 1 },

  note: { ...typography.bodySmall, color: colors.textSecondary, fontStyle: 'italic', marginBottom: 8 },

  emptyCard: { backgroundColor: colors.lav50, borderRadius: 24, padding: 20 },
  emptyTxt: { ...typography.bodySmall, color: colors.textSecondary },

  shareBtn: {
    backgroundColor: colors.primary,
  },
  shareTxt: { ...typography.label, color: colors.onPrimary },

  warningAlertCard: {
    backgroundColor: '#FFF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#E15858',
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
  },
  warningAlertTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  warningAlertTitle: {
    ...typography.label,
    color: '#E15858',
    fontWeight: '800',
  },
  warningAlertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginVertical: 2,
  },
  warningAlertBullet: {
    color: '#E15858',
    fontWeight: '800',
  },
  warningAlertTxt: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
  },

  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 18,
    ...shadows.soft,
  },
  pdfBtn: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
  },
  pdfTxt: {
    ...typography.label,
    color: colors.primaryDeep,
  },
});
