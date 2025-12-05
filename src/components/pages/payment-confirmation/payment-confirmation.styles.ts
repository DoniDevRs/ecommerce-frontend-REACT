import styled from "styled-components";

export const PaymetConfirmationContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const PaymentConfirmationContent = styled.div`
    text-align: center;
    width: 500px;

    p {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 1.125rem; 
        font-weight: 500;
    }
`;