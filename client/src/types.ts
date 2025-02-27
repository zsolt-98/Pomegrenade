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

export type OTPFormInputs = {
  otp: string;
};
