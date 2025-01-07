export type WasteType = 'mixed_garbage' | 'asphalt' | 'dirt' | 'mixed_dirt' | 'brick_and_block' | 'concrete' | 'brick_block_concrete';

export type BinSize = '6' | '8' | '10' | '14';

export type BinPlacement = 'right_side' | 'left_side' | 'on_lawn';

export interface OrderDetails {
  wasteType: WasteType | null;
  binSize: BinSize | null;
  binPlacement: BinPlacement | null;
  address: string;
  deliveryDate: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

export interface WizardContextType {
  currentStep: number;
  orderDetails: OrderDetails;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

