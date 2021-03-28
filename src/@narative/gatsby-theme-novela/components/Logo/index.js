import React from 'react';
import image from "../../../../assets/logo.jpg";
import styled from "@emotion/styled";

const Image = styled.img`
  height: 100px;
`

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property value called `fill`. `fill` is useful
 * when you want to change your logo depending on the theme you are on.
 */
export default function Logo({ fill }) {
    return (
        <Image src={image} alt=""/>
    );
}
