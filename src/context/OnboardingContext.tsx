import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface OnboardingDraft {
  name: string | null;
  relationship: 'mae' | 'parceiro' | 'outro' | null;
  dueDateMethod: 'due_date' | 'lmp' | 'conception' | null;
  inputDate: string | null;
  estimatedDueDate: string | null;
}

interface OnboardingContextType {
  draft: OnboardingDraft;
  setName: (name: string | null) => void;
  setRelationship: (relationship: 'mae' | 'parceiro' | 'outro' | null) => void;
  setDueDateMethod: (method: 'due_date' | 'lmp' | 'conception' | null) => void;
  setInputDate: (date: string | null) => void;
  setEstimatedDueDate: (date: string | null) => void;
  clearDate: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const INITIAL_DRAFT: OnboardingDraft = {
  name: null,
  relationship: null,
  dueDateMethod: null,
  inputDate: null,
  estimatedDueDate: null,
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>(INITIAL_DRAFT);

  const setName = (name: string | null) => {
    setDraft((prev) => ({ ...prev, name }));
  };

  const setRelationship = (relationship: 'mae' | 'parceiro' | 'outro' | null) => {
    setDraft((prev) => ({ ...prev, relationship }));
  };

  const setDueDateMethod = (method: 'due_date' | 'lmp' | 'conception' | null) => {
    setDraft((prev) => ({ ...prev, dueDateMethod: method }));
  };

  const setInputDate = (date: string | null) => {
    setDraft((prev) => ({ ...prev, inputDate: date }));
  };

  const setEstimatedDueDate = (date: string | null) => {
    setDraft((prev) => ({ ...prev, estimatedDueDate: date }));
  };

  const clearDate = () => {
    setDraft((prev) => ({
      ...prev,
      inputDate: null,
      estimatedDueDate: null,
      dueDateMethod: null,
    }));
  };

  const value: OnboardingContextType = {
    draft,
    setName,
    setRelationship,
    setDueDateMethod,
    setInputDate,
    setEstimatedDueDate,
    clearDate,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextType {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding deve ser usado dentro de OnboardingProvider');
  }
  return context;
}
