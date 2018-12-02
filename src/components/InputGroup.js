import React from 'react'
import styled from 'react-emotion'
const radius = '3px'
const InputGroupElement = styled('div')`
  display:flex;
  height:100%;
  input{
    border-radius:
                  ${props => props.addonBefore ? '0' : radius}
                  ${props => props.addonAfter ? '0' : radius}
                  ${props => props.addonAfter ? '0' : radius}
                  ${props => props.addonBefore ? '0' : radius};
  }
  ${props => props.addonBefore && `
    .addon:first-of-type{
      border-radius: ${radius} 0 0 ${radius};
    }
  `}
  ${props => props.addonAfter && `
    .addon:last-of-type{
      border-radius: 0 ${radius} ${radius} 0;
    }
  `}
`
const AddonElement = styled('div')`
  background:${props => props.theme.colors.grey};
  color:black;
  border:3px solid ${props => props.theme.colors.grey};
  padding:5px;
  height:calc(100% - 16px);
  margin:0 -3px 0 -3px;
`
export const InputGroup = (props) => {
  return (
    <InputGroupElement {...props}>
    {props.children}
    </InputGroupElement>
  )
}
export const InputAddon = (props) => {
  return (
    <AddonElement className="addon">
    {props.children}
    </AddonElement>
  )
}
