import { Container, Title } from '@mantine/core'
import React from 'react'
import  QuestionTable  from '../Components/UI/Table/Table'

export const Questions = () => {
    const data =[
          {
            "id": "1",
            "title": "Four Sum",
            "link1": "Leetcode",
            "link2": "GFG"
          },
          {
            "id": "2",
            "title": "Four Sum",
            "link1": "Leetcode",
            "link2": "GFG"
          },
          {
            "id": "3",
            "title": "Four Sum",
            "link1": "Leetcode",
            "link2": "GFG"
          },
          
        ]
      
  return (
    <Container
      fluid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      <Title align="center">Questions - Arrays</Title>
      <QuestionTable questionData={data} />
      </Container>
  )
}
