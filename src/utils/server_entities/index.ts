export const initialState = { message: "" };

export interface ResponseMessage {
  message: string;
}

export const response_message = {
  creation_success: { message: "Successfully created" },
  creation_error: { message: "Error creating word" },
  get_error: { message: "Error fetching words" },
  update_success: { message: "Successfully updated" },
  update_error: { message: "Error updating word" },
};

export const handleServerError = (error: any) => {
  console.log(error);

  throw error;
};
