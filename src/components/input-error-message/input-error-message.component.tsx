import { FunctionComponent, ReactNode } from "react";

import { InputErrorMessageContainer } from "./input-error-message.styles";

const InputErrorMessage: FunctionComponent<{ children: ReactNode }> = ({ children }) => { 
    return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage;