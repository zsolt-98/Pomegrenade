export interface SVGProps {
  size?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

export interface ButtonHollowPillProps {
  children: string;
  navigateTo?: string;
}

export interface InputProps {
  type: string;
  className?: string;
  placeholder: string;
}
