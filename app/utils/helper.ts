import axios from "axios";
import { CredentialsSignin } from "next-auth";
import { toast } from "react-toastify";

export const errorHandler = (error:unknown) => {
   
    console.log(error, error instanceof CredentialsSignin)

    if (axios.isAxiosError(error)) {
        if (error.response) {
            toast.error(error.response.data.message || "Something went wrong");
        } else if (error.request) {
            toast.error("Network error. Please try again later.");
        } else {
            toast.error("An error occurred. Please try again.");
        }
    } else {
        toast.error("Unexpected error occurred.");
    }
};

