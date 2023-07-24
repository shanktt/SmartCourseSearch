import React from 'react';
import styled, {keyframes} from 'styled-components'

const Container = styled.div`
  border-radius: 6px;
  background-color: white;
  box-shadow: 5px 5px 0px #000;
  border: 2px solid black;
  @media (min-width: 900px) {
    width: 880px;
    padding: 15px 20px;
    margin-top: 20px;
  }
  padding: 10px 15px;
  min-width: 320px;
`

const TitleContainer = styled.div`
  display: flex;
  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }
  flex-direction: column;
  //display: flex;
  border-bottom: 1px solid #000;
`

const AvgGpa = styled.div`
  //margin-right: 5px;
  @media (min-width: 900px) {
    font-size: 17px;
    font-weight: 500;
  }
  font-size: 13px;
  min-width: 105px;
  font-weight: 300;
  margin-right: 2px;
  white-space: nowrap;
`

const Description = styled.div`
    margin: 5px 0px;
  @media (min-width: 900px) {
    font-size: 16px;
  }
  font-size: 13px;
`

const TagList = styled.div`
    display: flex;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: auto;
  flex-wrap: wrap;
  gap: 10px;
`

const Heading = styled.h2`
  all: unset;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 700;
  font-size: 25px;
  @media (min-width: 900px) {
    width: 710px;
    font-size: 25px;
    margin-right: 10px;
  }
  font-size: 16px;
`


const Tag = styled.div`
  @media (min-width: 900px) {
    padding: 5px 10px;
    font-weight: 500;
    font-size: 16px;
  }
  padding: 2px 5px;
  font-weight: 400;
  font-size: 14px;

  background: #000;
  border-radius: 5px;
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 2px 2px 0px #000;
`

const options = [
  'Social & Behavioral Sciences',
  'Cultural Studies',
  'Humanities & the Arts',
  'Advanced Composition',
  'Quantitative Reasoning',
  'Natural Sciences & Technology',
  'Composition I',
];
function CourseCard({cardInfo}) {
    return (
        <Container>
            <TitleContainer>
                <Heading>
                    <span> {cardInfo.MajorAbbreviation}&nbsp;{cardInfo.CourseNumber}:&nbsp;{cardInfo.CourseName.replaceAll('amp;', '')}
                    </span>
                </Heading>
                {
                    cardInfo.AverageGPA > 0 &&
                    <AvgGpa>
                        Avg GPA: {cardInfo.AverageGPA.toFixed(2)}
                    </AvgGpa>
                }

            </TitleContainer>
            <Description>
                {cardInfo.Description}
            </Description>
            <TagList>
                {cardInfo.DegreeAttributes.map((val, idx) => {
                    return <Tag key={idx}>
                    {val}
                </Tag>})}
                {cardInfo.MinCreditHours === cardInfo.MaxCreditHours ? 
                  <Tag>{cardInfo.MinCreditHours} Credit Hours</Tag> : 
                  <Tag>{cardInfo.MinCreditHours} to {cardInfo.MaxCreditHours} Credit Hours</Tag>
                }
            </TagList>
        </Container>
    );
}

export default CourseCard;