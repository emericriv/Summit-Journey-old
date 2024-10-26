export interface DifficultyInputProps {
  color: string;
}

export interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}