import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  border-radius: 6px;
  background-color: white;
  padding: 5px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`
const Heading = styled.h2`
  overflow: hidden;
  white-space: nowrap;
  margin-right: 10px;
  font-weight: 700;
  font-size: 25px;
`

const AvgGpa = styled.div`
  //margin-right: 5px;
  min-width: 105px;
  font-weight: 500;
  font-size: 17px;
`

const Description = styled.div`
`

const TagList = styled.div`
    display: flex;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: auto;
  flex-wrap: wrap;
  gap: 5px;
`
const Tag = styled.div`
    background-color: yellow;
  padding: 5px 10px;
  
`

function CourseCard({props}) {
    let subject = 'AAS'
    let courseNumber = 100
    let courseTitle = "Intro Asian American Studies"
    let courseDescription = "Interdisciplinary introduction to the basic concepts and approaches in Asian American Studies. Surveys the various dimensions of Asian American experiences including history, social organization, literature, arts, and politics."
    let hours = "3 hours"
    let tags= [15, 18]
    // 30107
    let avgGpa = 3.43666667
    return (
        <Container>
            <TitleContainer>
                <Heading>
                    {subject}&nbsp;{courseNumber}:&nbsp;{courseTitle}
                </Heading>
                <AvgGpa>
                    Avg GPA: {avgGpa.toFixed(2)}
                </AvgGpa>
            </TitleContainer>
            <Description>
                {courseDescription}
            </Description>
            <TagList>
                <Tag>
                    Advanced Composition
                </Tag>
                <Tag>
                    Western/Comparative Culture
                </Tag>
                <Tag>
                    Advanced Composition
                </Tag>
                <Tag>
                    Western/Comparative Culture
                </Tag>
                <Tag>
                    Advanced Composition
                </Tag>
                <Tag>
                    Western/Comparative Culture
                </Tag>
            </TagList>
        </Container>
    );
}

export default CourseCard;