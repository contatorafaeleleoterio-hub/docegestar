import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface State {
  hasError: boolean;
  message: string;
  stack: string;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false, message: '', stack: '' };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error?.message ?? 'Erro desconhecido',
      stack: error?.stack ?? '',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Algo deu errado ao abrir o app</Text>
        <Text style={styles.subtitle}>Envie esta tela ao suporte:</Text>
        <ScrollView style={styles.scroll}>
          <Text style={styles.message}>{this.state.message}</Text>
          <Text style={styles.stack}>{this.state.stack}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#FBF7FA',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#281438',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#5C4B6E',
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  message: {
    fontSize: 13,
    color: '#B00020',
    marginBottom: 12,
    fontWeight: '600',
  },
  stack: {
    fontSize: 11,
    color: '#444',
    fontFamily: 'monospace',
  },
});
