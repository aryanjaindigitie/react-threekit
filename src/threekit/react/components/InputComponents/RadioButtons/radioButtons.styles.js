import styled from 'styled-components'

export const Wrapper = styled.div``

export const RadioButtonsHeader = styled.div`
    padding-bottom: 5px;
`

export const Buttons = styled.div`
    display: flex;
    flex-direction: row;

    & > div {
        margin-right: 5px;
    }
`

export const ButtonWrapper = styled.div`
    width: max-content;
    height: max-content;
    padding: 6px 12px;

    border: 1px solid ${(props) => (props.selected ? 'red' : 'lightgrey')};
    border-radius: 3px;

    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        border: 1px solid #1890ff;
        color: #1890ff;
    }
`
