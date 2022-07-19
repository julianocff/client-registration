export interface Genre {
  value: string;
  viewValue: string;
}

export enum height {
  MAX_SIZE = 10,
}

export interface MessageError {
  required?: string;
  max?: string;
  pattern?: string;
}

export enum MessagesRegistrationSend {
  SUCCESSFULLY = 'Successfully registered',
  BACK_LIST = 'Back to list',
}

export enum MessagesRegistrationSave {
  SUCCESSFULLY = 'Successfully updated',
}
