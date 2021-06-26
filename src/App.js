import styled from "styled-components";

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
`;

const Area = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
`;

export default function App() {
    return (
        <Main>
            <Area>
                <div>left</div>
            </Area>
            <Area>
                <div>middle</div>
            </Area>
            <Area>
                <div>right</div>
            </Area>
        </Main>
    );
}