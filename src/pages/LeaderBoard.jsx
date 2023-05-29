import React from 'react'
import { Container, Select, Title } from '@mantine/core'
import  CustomTable  from '../Components/UI/Table/Table'
import { LeaderBoardTable } from '../Components/UI/Table/LeaderBoardTable'

const LeaderBoard = () => {
    
   const data=[
          {
            "name": "Rishi Gupta",
            "sheet": "Striver SDE Sheet",
            "questions": 200,
            "completed": 150
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
    <Title align="center">LeaderBoard</Title>
    <Container sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    }} >
    <Select
      label="Sheet"
      placeholder="Pick one"
      searchable
      nothingFound="No options"
      data={['Striver', '450', 'Svelte', 'Vue']}
    />
    <Select
      label="Duration"
      placeholder="Pick one"
      nothingFound="No options"
      data={['Today', 'This week', 'This month', 'All time']}
    />
    </Container>
    <LeaderBoardTable data={data} />
    </Container>
)
}

export default LeaderBoard