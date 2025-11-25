// Define proper types for the state
export interface ConsultState {
  consultant: any;
  isEditingConsultant: boolean;
  consultants?: any[];
}

// Define action types
export interface SelectConsultantAction {
  type: typeof types.selectConsultant;
  consultant: any;
}

export interface IsEditingConsultantAction {
  type: typeof types.isEditingConsultant;
  isEditing: boolean;
}

export interface AddConsultantAction {
  type: typeof types.addConsultant;
  consultants: any[];
}

export type ConsultAction = SelectConsultantAction | IsEditingConsultantAction | AddConsultantAction;

export const types = {
  selectConsultant: 'Consult/consultant',
  isEditingConsultant: 'Consult/isEditingConsultant',
  addConsultant: 'Consult/consultants',
} as const;

export const consultReducer = (state: ConsultState, action: ConsultAction): ConsultState => {
  switch (action.type) {
    case types.selectConsultant:
      return {
        ...state,
        consultant: action.consultant,
      };
    case types.isEditingConsultant:
      return {
        ...state,
        isEditingConsultant: action.isEditing,
      };
    case types.addConsultant:
      return {
        ...state,
        consultants: action.consultants,
      };
    default:
      return state;
  }
};
