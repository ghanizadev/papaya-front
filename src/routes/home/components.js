import styled from 'styled-components';

import logo from '../../assets/logo.png';

export const Background = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    padding: calc(5.25vw + 45px) 45px 45px calc(18vw + 45px);
    box-sizing: border-box;
`;

export const Logo = styled.div`
    background-image: url(${logo});
    background-size: 75%;
    background-position: center;
    background-repeat: no-repeat;
    padding: 25px;
    position: absolute;
    top: 0;
    left: 0;
    height: 12vw;
    width: 18vw;
    box-sizing: border-box;

`;

export const Header = styled.div`
    height: 3.5vw;
    color: #fff;
    background-color: #ffbe5b;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 0 18vw;
    justify-content: flex-end;
`;

export const SubHeader = styled.div`
    height: 1.75vw;
    color: #fff;
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 3.5vw 0 0 18vw;
    justify-content: flex-start;
`;

export const SideBar = styled.div`
    width: 18vw;
    padding: calc(12vw + 25px) 0 25px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    left:0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: #fff;
`;

export const Button = styled.button`
    width: 100%;
    height: 58px;
    font-size: 18pt;
    color: #6b6b6b;
    background-color: #fbfbfb;
    text-align: center;
    padding: 5px;
    border: 0.25px solid #dcdcdc;
`;

export const Container = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
`;
