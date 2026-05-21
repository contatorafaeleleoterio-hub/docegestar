import { useState, useEffect, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, ActivityIndicator, Alert, Switch, Platform, Image,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, shadows } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { getProfile, saveProfile } from '../../src/hooks/useUserProfile';
import { calculateWeekFromDueDate } from '../../src/hooks/useCurrentWeek';
import { parseDateBR, toISO, isoToBR } from '../../src/utils/date';
import { useNotificationSettings, type NotificationType } from '../../src/hooks/useNotificationSettings';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';

const NOTIFICATION_LABELS: Record<NotificationType, string> = {
  prenatal_appointments: 'Consultas pré-natais',
  weekly_milestones: 'Marcos semanais',
  kick_counter: 'Contador de chutes',
  contractions: 'Contrações',
};

const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function formatDueDateLong(iso: string | null | undefined): string {
  if (!iso) return 'Não informada';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return 'Não informada';
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]} · ${d.getFullYear()}`;
}

interface MenuItem {
  icon: DGIconName;
  label: string;
  sub?: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
}

function ProfileGroup({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.groupContent}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuRow, index !== items.length - 1 && styles.menuRowBorder]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconWrap}>
              <DGIcon name={item.icon} size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.sub && <Text style={styles.menuSub}>{item.sub}</Text>}
            </View>
            {item.rightElement || <DGIcon name="chevronRight" size={16} color={colors.textLight} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function PerfilScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(true);
  
  // Profile state
  const [name, setName] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dateError, setDateError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [dueDateISO, setDueDateISO] = useState<string | null>(null);
  const [gestationType, setGestationType] = useState<string | null>(null);
  const [firstChild, setFirstChild] = useState<number | null>(null);
  const [babyName, setBabyName] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<'name' | 'date' | 'babyName' | null>(null);
  
  const { settings, loading: notifLoading, updateSetting } = useNotificationSettings();
  const [expandedSection, setExpandedSection] = useState<'gestacao' | 'notificacoes' | null>(null);

  useEffect(() => {
    async function load() {
      const profile = await getProfile();
      if (profile) {
        setName(profile.name ?? '');
        setDateInput(isoToBR(profile.dueDate ?? ''));
        setDueDateISO(profile.dueDate ?? null);
        setGestationType(profile.gestationType ?? null);
        setFirstChild(profile.firstChild ?? null);
        setBabyName(profile.babyName ?? null);
        setPhotoUri(profile.photoUri ?? null);
        if (profile.dueDate) setCurrentWeek(calculateWeekFromDueDate(profile.dueDate));
      }
    }
    load();
  }, []);

  const progressPct = currentWeek ? Math.min(100, Math.round((currentWeek / 40) * 100)) : 0;
  const initial = (name || babyName || 'A').trim().charAt(0).toUpperCase();

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      // Save immediately or wait for profile save? Let's save immediately for better UX
      if (dueDateISO) {
        await saveProfile(name, dueDateISO, gestationType, firstChild, babyName, uri);
      }
    }
  }

  async function handleSave() {
    if (dateInput.length < 10) { setDateError('Informe a data prevista do parto.'); return; }
    const parsed = parseDateBR(dateInput);
    if (!parsed) { setDateError('Data inválida. Use DD/MM/AAAA.'); return; }
    setLoading(true);
    try {
      const iso = toISO(parsed);
      await saveProfile(name.trim() || null, iso, gestationType, firstChild, babyName, photoUri);
      setDueDateISO(iso);
      setCurrentWeek(calculateWeekFromDueDate(iso));
      setIsEditing(false);
      Alert.alert('Salvo!', 'Perfil atualizado com sucesso.');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleResetApp() {
    Alert.alert(
      'Reiniciar App',
      'Isso vai te levar de volta ao onboarding e apagar seu perfil atual. Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', style: 'destructive', onPress: () => router.replace('/onboarding') },
      ]
    );
  }

  const gestacaoItems: MenuItem[] = [
    {
      icon: 'calendar',
      label: 'Data prevista do parto',
      sub: formatDueDateLong(dueDateISO),
      onPress: () => setIsEditing(true),
    },
    {
      icon: 'baby',
      label: 'Nome do Bebê',
      sub: babyName || 'Não definido',
      onPress: () => setIsEditing(true),
    },
    {
      icon: 'activity',
      label: 'Tipo de Gestação',
      sub: gestationType || 'Única',
      onPress: () => setIsEditing(true),
    },
  ];

  const preferenciaItems: MenuItem[] = [
    {
      icon: 'bell',
      label: 'Notificações',
      sub: 'Gerenciar alertas e lembretes',
      onPress: () => setExpandedSection(expandedSection === 'notificacoes' ? null : 'notificacoes'),
    },
    {
      icon: 'tool',
      label: 'Unidades de Medida',
      sub: 'Métrico (kg, cm)',
      onPress: () => Alert.alert('Em breve', 'Personalização de unidades em breve.'),
    },
  ];

  const suporteItems: MenuItem[] = [
    {
      icon: 'helpCircle',
      label: 'Central de Ajuda',
      onPress: () => Alert.alert('Suporte', 'Entre em contato pelo e-mail: suporte@docegestar.com'),
    },
    {
      icon: 'info',
      label: 'Sobre o DoceGestar',
      sub: 'Versão 1.2.0',
      onPress: () => {},
    },
  ];

  const contaItems: MenuItem[] = [
    {
      icon: 'download',
      label: 'Exportar Meus Dados',
      sub: 'Gerar PDF da gestação',
      onPress: () => Alert.alert('Premium', 'Esta funcionalidade está disponível no Plano Plus.'),
    },
    {
      icon: 'logout',
      label: 'Encerrar Sessão (Reset)',
      onPress: handleResetApp,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: bottom + 40 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.lav100, colors.background]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.profileRow}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarWrap}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarImage} />
            ) : (
              <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{initial}</Text>
              </LinearGradient>
            )}
            <View style={styles.cameraBadge}>
              <DGIcon name="camera" size={12} color="#ffffff" />
            </View>
          </TouchableOpacity>
          
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{name || 'Mamãe'}</Text>
            <Text style={styles.userSub}>
              {currentWeek ? `${currentWeek}ª semana` : 'Início da jornada'}
            </Text>
            <TouchableOpacity 
              style={styles.editBtn} 
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editBtnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mini Stats */}
        <View style={styles.miniStats}>
          <View style={styles.miniStatItem}>
            <Text style={styles.miniStatValue}>{currentWeek || '0'}</Text>
            <Text style={styles.miniStatLabel}>Semanas</Text>
          </View>
          <View style={styles.miniStatDivider} />
          <View style={styles.miniStatItem}>
            <Text style={styles.miniStatValue}>{progressPct}%</Text>
            <Text style={styles.miniStatLabel}>Progresso</Text>
          </View>
        </View>
      </LinearGradient>

      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.editHeader}>
            <Text style={styles.editTitle}>Editar Informações</Text>
            <TouchableOpacity onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Seu nome</Text>
          <TextInput
            style={[styles.input, focusedField === 'name' && styles.inputFocused]}
            value={name}
            onChangeText={setName}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
          />

          <Text style={styles.label}>Nome do Bebê (opcional)</Text>
          <TextInput
            style={[styles.input, focusedField === 'babyName' && styles.inputFocused]}
            value={babyName || ''}
            onChangeText={setBabyName}
            onFocus={() => setFocusedField('babyName')}
            onBlur={() => setFocusedField(null)}
          />

          <Text style={styles.label}>Data Prevista do Parto (DPP) *</Text>
          <MaskInput
            style={[styles.input, focusedField === 'date' && styles.inputFocused, dateError ? styles.inputError : null]}
            value={dateInput}
            onChangeText={(masked) => { setDateInput(masked); setDateError(''); }}
            mask={Masks.DATE_DDMMYYYY}
            keyboardType="numeric"
            onFocus={() => setFocusedField('date')}
            onBlur={() => setFocusedField(null)}
          />
          {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

          <TouchableOpacity
            style={[styles.saveBtn, loading && { opacity: 0.6 }]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Salvar Alterações</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.menuContainer}>
          <ProfileGroup title="Gestação" items={gestacaoItems} />
          
          <ProfileGroup title="Preferências" items={preferenciaItems} />
          
          {expandedSection === 'notificacoes' && (
            <View style={styles.notifPanel}>
              {Platform.OS === 'web' ? (
                <Text style={styles.notifWebText}>Notificações disponíveis apenas no mobile.</Text>
              ) : notifLoading ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                (Object.keys(NOTIFICATION_LABELS) as NotificationType[]).map(type => {
                  const setting = settings.find(s => s.type === type);
                  return (
                    <View key={type} style={styles.notifRow}>
                      <Text style={styles.notifLabel}>{NOTIFICATION_LABELS[type]}</Text>
                      <Switch
                        value={setting?.enabled ?? false}
                        onValueChange={val => updateSetting(type, val)}
                        trackColor={{ false: colors.border, true: colors.primaryLight }}
                        thumbColor={setting?.enabled ? colors.primary : colors.textLight}
                      />
                    </View>
                  );
                })
              )}
            </View>
          )}

          <ProfileGroup title="Suporte" items={suporteItems} />
          
          <ProfileGroup title="Conta" items={contaItems} />
        </View>
      )}

      <View style={styles.footer}>
        <Image 
          source={require('../../assets/Logo_Marca_DoceGestar_Base.png')} 
          style={styles.footerLogo}
          resizeMode="contain"
        />
        <Text style={styles.footerText}>Feito com carinho para você e seu bebê.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    ...shadows.soft,
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    color: '#ffffff',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    color: colors.text,
  },
  userSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editBtn: {
    marginTop: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    alignSelf: 'flex-start',
    ...shadows.soft,
  },
  editBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  miniStats: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginTop: 24,
    borderRadius: 20,
    paddingVertical: 12,
    ...shadows.soft,
  },
  miniStatItem: { flex: 1, alignItems: 'center' },
  miniStatValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: colors.text,
  },
  miniStatLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSecondary,
  },
  miniStatDivider: { width: 1, backgroundColor: colors.border, marginVertical: 4 },
  
  menuContainer: { paddingHorizontal: 20, marginTop: 12 },
  group: { marginTop: 24 },
  groupTitle: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  groupContent: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: 8,
    ...shadows.soft,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 16,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.lav50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    ...typography.label,
    color: colors.text,
    fontSize: 15,
  },
  menuSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  
  editContainer: { padding: 24 },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  editTitle: { ...typography.h2, color: colors.text },
  cancelText: { ...typography.label, color: colors.textSecondary },
  label: { ...typography.label, color: colors.text, marginTop: 16, marginBottom: 8 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    ...typography.body,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  inputFocused: { borderColor: colors.primary },
  inputError: { borderColor: colors.error },
  errorText: { ...typography.caption, color: colors.error, marginTop: 4 },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
    ...shadows.primary,
  },
  saveBtnText: { ...typography.label, color: '#ffffff', fontSize: 16 },
  
  notifPanel: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: -8,
    padding: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...shadows.soft,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  notifLabel: { ...typography.bodySmall, color: colors.text },
  notifWebText: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  
  footer: {
    marginTop: 48,
    alignItems: 'center',
    opacity: 0.5,
  },
  footerLogo: { width: 100, height: 40 },
  footerText: { ...typography.caption, color: colors.textSecondary, marginTop: 8 },
});
