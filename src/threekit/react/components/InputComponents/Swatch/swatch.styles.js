import styled from 'styled-components'

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, max-content);
    grid-gap: 12px;
`

export const ItemWrapper = styled.div`
    height: max-content;
    min-width: 80px;
    padding: 12px 5px;

    border: 1px solid ${(props) => (props.selected ? 'red' : 'lightgrey')};
    border-radius: 3px;

    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        border: 1px solid #1890ff;
        color: #1890ff;
    }

    & > div {
        & > div:nth-child(1) {
            margin: 0 auto;
            height: 68px;
            width: 68px;
            ${(props) =>
                props.color ? `background: ${props.color};` : ''} img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        & > div:nth-child(2) {
            text-align: center;
            margin-top: 8px;
        }
    }
`

export const SwatchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    padding: 12px 5px;
    min-width: 120px;
`

export const SwatchHeader = styled.div`
    padding-bottom: 5px;
`

export const SwatchBody = styled.div``
