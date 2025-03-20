export interface IMenu {
  label: string;
  action: () => void;
  disabled?: boolean;
}
