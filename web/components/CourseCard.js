import React from 'react';
import styled, {keyframes} from 'styled-components'

const Container = styled.div`
  border-radius: 6px;
  background-color: white;
  padding: 15px 20px;
  box-shadow: 5px 5px 0px #000;
  border: 2px solid black;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #000;
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
  margin-right: 2px;
`

const Description = styled.div`
    margin: 5px 0px;
`

const TagList = styled.div`
    display: flex;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: auto;
  flex-wrap: wrap;
  gap: 10px;
`



const Tag = styled.div`

  background: #000;
  background-size: 400% 400%;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;
  border: 1px solid #000;
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 2px 2px 0px #000;
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

            </TagList>
        </Container>
    );
}

export default CourseCard;