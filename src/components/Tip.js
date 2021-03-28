import styled from "@emotion/styled";
import React from "react";

const Wrapper = styled.div`
    background: ${p => p.theme.colors.background};
    border-left: ${p => p.theme.colors.background};
    padding: 20px;
    margin: 30px 0;

    *:last-child {
      margin-bottom: 0;
    }

    strong + * {
    margin-top: 10px;
    }
`;

const Tip = ({title = "Tip", children,  ...props}) => {
    return (
        <div className="Image__Medium">
            <Wrapper {...props}>
                <strong>{title}</strong>
                {children}
            </Wrapper>
        </div>
    );
};

export default Tip;
