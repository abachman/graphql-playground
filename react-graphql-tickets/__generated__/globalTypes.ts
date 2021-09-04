/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AuthProviderCredentialsInput {
  email: string;
  password: string;
}

export interface TicketTypeQuantityInput {
  ticketTypeId: string;
  quantity: number;
}

export interface UpdateOrderInput {
  ticketTypeQuantities: TicketTypeQuantityInput[];
  performanceId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
