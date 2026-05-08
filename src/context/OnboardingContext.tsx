import React, { createContext, useContext, useState } from 'react';

interface OnboardingDraft {
  name: string;
  relationship: 'mae' | 'parceiro' | 'outro' | null;
  dueDateMethod: 'due_date' | 'lmp' | 'conception' | null;
  inputDate: string | null;
  estimatedDueDate: string | null;
}

interface OnboardingContextValue {
  draft: OnboardingDraft;
  setName: (name: string) => void;
  setRelationship: (rel: 'mae' | 'parceiro' | 'outro' | null) => void;
  setDueDateMethod: (method: 'due_date' | 'lmp' | 'conception' | null) => void;
  setInputDate: (date: string | null) => void;
  setEstimatedDueDate: (date: string | null) => void;
  clearDate: () => void;
}

const initialDraft: OnboardingDraft = {
  name: '',
  relationship: null,
  dueDateMethod: null,
  inputDate: null,
  estimatedDueDate: null,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);

  function setName(name: string) {
    setDraft(prev => ({ ...prev, name }));
  }

  function setRelationship(relationship: 'mae' | 'parceiro' | 'outro' | null) {
    setDraft(prev => ({ ...prev, relationship }));
  }

  function setDueDateMethod(dueDateMethod: 'due_date' | 'lmp' | 'conception' | null) {
    setDraft(prev => ({ ...prev, dueDateMethod }));
  }

  function setInputDate(inputDate: string | null) {
    setDraft(prev => ({ ...prev, inputDate }));
  }

  function setEstimatedDueDate(estimatedDueDate: string | null) {
    setDraft(prev => ({ ...prev, estimatedDueDate }));
  }

  function clearDate() {
    setDraft(prev => ({ ...prev, dueDateMethod: null, inputDate: null, estimatedDueDate: null }));
  }

  return (
    <OnboardingContext.Provider
      value={{ draft, setName, setRelationship, setDueDateMethod, setInputDate, setEstimatedDueDate, clearDate }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used inside OnboardingProvider');
  return ctx;
}
