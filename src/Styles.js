import styled from "styled-components";

export const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Portrait = styled(Main)`
    flex-direction: column;
`;

export const Area = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-user-select: none;    
`;

export const GamepadArea = styled(Area)`
    width: 25%;
`;

export const EmulatorArea = styled(Area)`
    width: 50%;
`;

export const StyledButton = styled.button`
    user-select: none;
`;

export const Message = styled.h2`
    text-align: center;
`;